import { useEffect, useState } from "react";

// Storage S3
import { getUrl } from "aws-amplify/storage";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import { listTokens } from "../../graphql/queries";
import {
  Button,
  HStack,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import { IoReload } from "react-icons/io5";
import TokenCard from "./TokenCard";
import TokenCardSkeleton from "./TokenCardSkeleton";
import Token from "../../data/Token";
import tokenCategories from "../../data/TokenCategories";
import CategorySelector from "../CategorySelector";
import Category from "../../data/Category";
import TokenCreateDrawer from "./TokenCreateDrawer";

interface Props {
  email: string;
  sub: string;
}

const TokenGrid = ({ email, sub }: Props) => {
  const {
    isOpen: isCreateDrawerOpen,
    onOpen: onCreateDrawerOpen,
    onClose: onCreateDrawerClose,
  } = useDisclosure();

  const [tokens, setTokens] = useState<Token[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    value: "all",
    label: "All",
  });

  const skeletons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  useEffect(() => {
    if (email != "") {
      handleListTokens();
    }
  }, [email, currentCategory]);

  const handleListTokens = async () => {
    setLoading(true);
    const graphqlClient = generateClient();

    let listTokenVariables = {};

    if (currentCategory.value == "all") {
      listTokenVariables = {
        filter: {
          or: [
            {
              creatorEmail: {
                eq: email,
              },
            },
            {
              shared: {
                eq: true,
              },
            },
            {
              systemProvided: {
                eq: true,
              },
            },
          ],
        },
      };
    } else {
      listTokenVariables = {
        filter: {
          and: [
            {
              or: [
                {
                  creatorEmail: {
                    eq: email,
                  },
                },
                {
                  shared: {
                    eq: true,
                  },
                },
                {
                  systemProvided: {
                    eq: true,
                  },
                },
              ],
            },
            {
              category: {
                eq: currentCategory.value,
              },
            },
          ],
        },
      };
    }

    graphqlClient
      .graphql({
        query: listTokens,
        variables: listTokenVariables,
      })
      .then((response) => {
        const tokenList = response.data.listTokens.items;
        tokenList.map(async (token) => {
          const tokenPicPath = token.tokenPicPath;
          const getUrlResult = await getUrl({
            path: tokenPicPath!,
            options: {
              expiresIn: 900,
            },
          });

          const tokenImage = getUrlResult.url.toString();
          token.tokenPicS3Url = tokenImage;
        });

        tokenList.sort((a, b) => a.name.localeCompare(b.name));

        setTokens(tokenList);
        setLoading(false);
      })
      .catch((error) => {
        setTokens([]);
        setError(error);
        setLoading(false);
      });
  };

  const handleCreateDrawerClose = () => {
    onCreateDrawerClose();
    handleListTokens();
  };

  const handleRefreshGrid = () => {
    setTokens([]);
    handleListTokens();
  };

  const handleTokenCategorySelected = (selectedCategory: Category) => {
    console.log("Token Category Selected: ", selectedCategory);

    if (selectedCategory.value == "all") {
      setCurrentCategory({ value: "all", label: "All" });
    } else {
      let cat = tokenCategories.find(
        (category) => category.value === selectedCategory.value
      );

      setCurrentCategory(cat!);
    }
  };

  const handleUpdateToken = (updatedToken: Token) => {
    setTokens(
      tokens.map((token) =>
        token.id === updatedToken.id
          ? { ...token, shared: updatedToken.shared }
          : token
      )
    );
  };

  const handleDeleteToken = (deletedToken: Token) => {
    const newTokenArray = tokens.filter((token) => token.id != deletedToken.id);
    setTokens(newTokenArray);
  };

  return (
    <>
      <HStack justifyContent={"space-between"}>
        <Tooltip
          hasArrow
          label="Create a new Token"
          bg="gray.300"
          color="black"
          openDelay={1000}
        >
          <Button
            isDisabled={isLoading}
            colorScheme="blue"
            onClick={onCreateDrawerOpen}
            marginLeft="10px"
          >
            <AddIcon />
          </Button>
        </Tooltip>
        <CategorySelector
          selectedCategory={currentCategory}
          onSelectCategory={handleTokenCategorySelected}
          categories={tokenCategories}
        />
        <Tooltip
          hasArrow
          label="Reload the Maps"
          bg="gray.300"
          color="black"
          openDelay={1000}
        >
          <Button isDisabled={isLoading} onClick={handleRefreshGrid}>
            <IoReload />
          </Button>
        </Tooltip>
      </HStack>
      <TokenCreateDrawer
        handleDrawerClose={handleCreateDrawerClose}
        isDrawerOpen={isCreateDrawerOpen}
        onCloseDrawer={onCreateDrawerClose}
        email={email}
        sub={sub}
      />
      {error && <Text color="tomato">{error}</Text>}
      <SimpleGrid
        columns={{ base: 2, sm: 2, md: 3, lg: 5, xl: 6, "2xl": 8 }}
        spacing={3}
        margin="10px"
      >
        {isLoading &&
          skeletons.map((skeleton) => <TokenCardSkeleton key={skeleton} />)}
        {tokens.map((token) => (
          <TokenCard
            key={token.id}
            token={token}
            loggedInEmail={email}
            updateToken={handleUpdateToken}
            deleteToken={handleDeleteToken}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default TokenGrid;
