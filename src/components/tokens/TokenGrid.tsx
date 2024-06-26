import { useEffect, useState } from "react";

// Storage S3
import { getUrl } from "aws-amplify/storage";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import { listTokens } from "../../graphql/queries";
import {
  Box,
  Button,
  Center,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import { IoReload } from "react-icons/io5";
import TokenCard from "./TokenCard";
import Token from "../../data/token/Token";
import tokenCategories from "../../data/token/TokenCategories";
import CategorySelector from "../CategorySelector";
import Category from "../../data/Category";
import TokenCreateDrawer from "./TokenCreateDrawer";
import TokenEditDrawer from "./TokenEditDrawer";
import IsLoadingIndicator from "../IsLoadingIndicator";

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

  const {
    isOpen: isEditDrawerOpen,
    onOpen: onEditDrawerOpen,
    onClose: onEditDrawerClose,
  } = useDisclosure();

  const [editToken, setEditToken] = useState<Token>();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    value: "all",
    label: "All",
  });

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

  const handleEditDrawerClose = () => {
    onEditDrawerClose();
    handleListTokens();
  };

  const handleRefreshGrid = () => {
    setTokens([]);
    handleListTokens();
  };

  const handleTokenCategorySelected = (selectedCategory: Category) => {
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

  const handleEditToken = (editToken: Token) => {
    setEditToken(editToken);
    onEditDrawerOpen();
  };

  const handleDeleteToken = (deletedToken: Token) => {
    const newTokenArray = tokens.filter((token) => token.id != deletedToken.id);
    setTokens(newTokenArray);
  };

  const tokenCountText = (): String => {
    if (tokens.length == 1) {
      return "Token in this Category";
    } else {
      return "Tokens in this Category";
    }
  };

  return (
    <Box me={2} mt={2} mb={2}>
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
      <Center>
        <Text mt={2}>
          {" "}
          {tokens.length} {tokenCountText()}
        </Text>
      </Center>
      <TokenCreateDrawer
        handleDrawerClose={handleCreateDrawerClose}
        isDrawerOpen={isCreateDrawerOpen}
        onCloseDrawer={onCreateDrawerClose}
        email={email}
        sub={sub}
      />
      <TokenEditDrawer
        handleDrawerClose={handleEditDrawerClose}
        isDrawerOpen={isEditDrawerOpen}
        onCloseDrawer={onEditDrawerClose}
        editToken={editToken!}
      />

      {isLoading && (
        <Stack mt={2}>
          <IsLoadingIndicator loadingLabel={"Loading tokens..."} />
        </Stack>
      )}

      {error && <Text color="tomato">{error}</Text>}
      <SimpleGrid
        columns={{ base: 2, sm: 2, md: 3, lg: 5, xl: 6, "2xl": 6 }}
        spacing={3}
        margin="10px"
      >
        {tokens.map((token) => (
          <TokenCard
            key={token.id}
            token={token}
            loggedInEmail={email}
            updateToken={handleUpdateToken}
            editToken={handleEditToken}
            deleteToken={handleDeleteToken}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TokenGrid;
