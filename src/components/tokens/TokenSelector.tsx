// React imports
import { useEffect, useState } from "react";

// Chakra UI imports
import {
  Box,
  Card,
  CardBody,
  HStack,
  Image,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import { listTokens } from "../../graphql/queries";

// Storage S3
import { getUrl } from "aws-amplify/storage";

// Custom imports
import Token from "../../data/Token";
import tokenCategories from "../../data/TokenCategories";

interface Props {
  email: string;
  handleSelectedToken: (selectedToken: Token | null) => void;
}

const TokenSelector = ({ email, handleSelectedToken }: Props) => {
  const tokenCardColor = useColorModeValue("gray.200", "gray.600");
  const tokenCardSelectedColor = useColorModeValue("blue.200", "blue.600");

  const [tokens, setTokens] = useState<Token[]>([]);

  const [selectedTokenCategory, setSelectedTokenCategory] = useState(
    "Please Select a Token Category"
  );

  useEffect(() => {
    if (selectedTokenCategory !== "Please Select a Token Category") {
      handleListTokens();
    }
  }, [selectedTokenCategory]);

  const handleListTokens = async () => {
    const graphqlClient = generateClient();

    let cat = tokenCategories.find((category) =>
      category.label === selectedTokenCategory ? category : null
    );

    const listTokenVariables = {
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
              eq: cat!.value,
            },
          },
        ],
      },
    };

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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTokenSelection = (selectedToken: Token) => {
    setTokens(
      tokens.map((token) =>
        token.id != selectedToken.id ? { ...token, selected: false } : token
      )
    );
    handleSelectedToken(selectedToken.selected ? selectedToken : null);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" padding={3}>
      <HStack>
        <Select
          onChange={(event) => {
            setSelectedTokenCategory(event.target.value);
          }}
        >
          <option key={0} value={"Please Select a Token Category"}>
            Please Select a Token Category
          </option>
          {tokenCategories.map((category) => (
            <option key={category.value} value={category.label}>
              {category.label}
            </option>
          ))}
          ;
        </Select>
      </HStack>
      {tokens.length == 0 &&
      selectedTokenCategory != "Please Select a Token Category" ? (
        <Text mt={2}>There are no tokens available in this category</Text>
      ) : (
        ""
      )}
      <SimpleGrid columns={3} spacing={1} paddingTop={2}>
        {tokens.map((token) => (
          <Card
            variant="outline"
            key={token.id}
            backgroundColor={
              token.selected ? tokenCardSelectedColor : tokenCardColor
            }
            onClick={() => {
              if (token.selected != null) {
                token.selected = !token.selected;
              } else {
                token.selected = true;
              }
              handleTokenSelection(token);
            }}
          >
            <CardBody padding={1}>
              <Stack>
                <Image src={token.tokenPicS3Url!}></Image>
                <Text ml={1} fontSize="xs">
                  {token.name}
                </Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TokenSelector;
