// React imports
import { useEffect, useState } from "react";

// Chakra Icon imports
import { ChevronDownIcon } from "@chakra-ui/icons";

// Chakra UI imports
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
  handleSelectedToken: (selectedToken: Token) => void;
  tokenNameMissing: boolean;
}

const TokenSelector = ({
  email,
  handleSelectedToken,
  tokenNameMissing,
}: Props) => {
  const tokenCardColor = useColorModeValue("gray.200", "gray.600");
  const tokenCardSelectedColor = useColorModeValue("blue.200", "blue.600");

  const [tokens, setTokens] = useState<Token[]>([]);

  const [selectedTokenCategory, setSelectedTokenCategory] = useState(
    "Select a Token Category"
  );

  useEffect(() => {
    if (selectedTokenCategory != "Select a Token Category") {
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
    handleSelectedToken(selectedToken);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" padding={3} borderColor={tokenNameMissing ? "red" :"gray.600"}>
      <Text paddingBottom="10px">Token Selector</Text>
      <Divider/>
      <HStack paddingTop="10px">
        <Text as="b" paddingRight={2}>
          Token Category
        </Text>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {selectedTokenCategory}
          </MenuButton>
          <MenuList>
            {tokenCategories.map((category) => (
              <MenuItem
                key={category.value}
                onClick={() => {
                  setSelectedTokenCategory(category.label);
                }}
              >
                <span>{category.label}</span>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </HStack>
      <SimpleGrid columns={3} spacing={1} paddingTop={2}>
        {tokens.map((token) => (
          <Card
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
            <CardBody>
              <Stack>
                <Image src={token.tokenPicS3Url!}></Image>
                <Text fontSize="xs">{token.name}</Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TokenSelector;
