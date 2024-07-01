// React Imports
import { useState } from "react";

// Amplify imports
import { generateClient } from "aws-amplify/api";
import * as mutations from "../../graphql/mutations";

// React Icon imports
import {
  MdOutlineEditNote,
  MdOutlineDelete,
  MdOutlineShare,
} from "react-icons/md";

// Chakra UI imports
import {
  Card,
  CardBody,
  Heading,
  Image,
  Button,
  CardFooter,
  Divider,
  Text,
  Center,
  ButtonGroup,
  Tooltip,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

import TokenDeleteConfirmationAlert from "./TokenDeleteConfirmationAlert";
import Token from "../../data/token/Token";
import tokenCategories from "../../data/token/TokenCategories";

interface Props {
  token: Token;
  updateToken: (token: Token) => void;
  editToken: (token: Token) => void;
  deleteToken: (token: Token) => void;
  loggedInEmail: string;
}

const TokenCard = ({
  token,
  loggedInEmail,
  updateToken,
  editToken,
  deleteToken,
}: Props) => {
  const cardBorderColor = useColorModeValue("gray.300", "gray.600");
  const cardBackgroundColor = useColorModeValue("gray.50", "gray.700");

  const [isDeleteTokenConfirmModalOpen, setDeleteTokenConfirmModalOpen] =
    useState(false);

  const onDeleteTokenAlertConfirmClose = () => {
    setDeleteTokenConfirmModalOpen(false);
  };

  const onDeleteTokenAlertConfirmCloseAfterDelete = () => {
    setDeleteTokenConfirmModalOpen(false);
    deleteToken(token);
  };

  const categoryLabel = (categoryValue: string): string | undefined => {
    return tokenCategories.find((category) => category.value === categoryValue)
      ?.label;
  };

  const textForSharedLabel = (): string => {
    if (token.shared == true) {
      if (token.creatorEmail == loggedInEmail) {
        return "You are sharing this Token";
      } else {
        return "Shared by '" + token.creatorEmail + "'";
      }
    } else {
      return "";
    }
  };

  const toggleShareFlag = (token: Token) => {
    const graphqlClient = generateClient();

    const tokenDetails = {
      id: token.id,
      shared: !token.shared,
    };

    graphqlClient
      .graphql({
        query: mutations.updateToken,
        variables: { input: tokenDetails },
      })
      .then((response) => {
        updateToken(response.data.updateToken);
      })
      .catch((error) => {
        console.log("update Token Error: ", error);
      });
  };

  return (
    <>
      <Card
        variant="outline"
        borderColor={cardBorderColor}
        backgroundColor={cardBackgroundColor}
      >
        <CardBody padding={3}>
          <Center>
            <Icon
              as={MdOutlineShare}
              pos="absolute"
              top="10px"
              right="10px"
              display={token.shared ? "flex" : "none"}
            />

            <Tooltip
              placement="top"
              openDelay={1000}
              hasArrow
              label={textForSharedLabel()}
              bg="gray.300"
              color="black"
            >
              <Image src={token.tokenPicS3Url!} borderRadius="lg" draggable="false" />
            </Tooltip>
          </Center>
          <Heading paddingTop={2} size="sm">
            {token.name}
          </Heading>
          <Text fontSize="xs" textColor="gray.500">
            Category: {categoryLabel(token.category)}
          </Text>
        </CardBody>
        <Divider />
        <CardFooter padding={2}>
          <Text
            display={loggedInEmail != token.creatorEmail ? "flex" : "none"}
            fontSize="xs"
          >
            {textForSharedLabel()}
          </Text>
          <ButtonGroup size="sm" isAttached padding="2px">
            <Tooltip
              hasArrow
              label="Edit the Token"
              bg="gray.300"
              color="black"
              openDelay={1000}
            >
              <Button
                display={loggedInEmail == token.creatorEmail ? "flex" : "none"}
                variant="outline"
                size="sm"
                onClick={() => {
                  editToken(token);
                }}
              >
                <MdOutlineEditNote />
              </Button>
            </Tooltip>
            <Tooltip
              hasArrow
              label="Delete the Token"
              bg="gray.300"
              color="black"
              openDelay={1000}
            >
              <Button
                display={loggedInEmail == token.creatorEmail ? "flex" : "none"}
                variant="outline"
                size="sm"
                onClick={() => {
                  setDeleteTokenConfirmModalOpen(true);
                }}
              >
                <MdOutlineDelete />
              </Button>
            </Tooltip>
            <Tooltip
              hasArrow
              label="Toggle Token Sharing"
              bg="gray.300"
              color="black"
              openDelay={1000}
            >
              <Button
                display={loggedInEmail == token.creatorEmail ? "flex" : "none"}
                variant="outline"
                size="sm"
                onClick={() => toggleShareFlag(token)}
              >
                <MdOutlineShare />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <TokenDeleteConfirmationAlert
        token={token}
        isOpen={isDeleteTokenConfirmModalOpen}
        onClose={onDeleteTokenAlertConfirmClose}
        onCloseAfterDelete={onDeleteTokenAlertConfirmCloseAfterDelete}
      />
    </>
  );
};

export default TokenCard;
