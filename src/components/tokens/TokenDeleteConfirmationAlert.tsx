import { useRef } from "react";

import { remove } from "aws-amplify/storage";
import { generateClient } from "aws-amplify/api";
import * as mutations from "../../graphql/mutations";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

import Token from "../../data/Token";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCloseAfterDelete: () => void;
  token: Token;
}

const TokenDeleteConfirmationAlert = ({
  isOpen,
  onClose,
  onCloseAfterDelete,
  token,
}: Props) => {
  const cancelRef = useRef(null);

  const handleDeleteToken = async (tokenToDelete: Token) => {
    try {
      await remove({
        path: tokenToDelete.tokenPicPath!,
      });
    } catch (error) {
      console.log(
        "Error deleting: " +
          tokenToDelete.tokenPicPath! +
          "with error: " +
          error
      );
    }

    const client = generateClient();

    const tokenDetails = {
      id: tokenToDelete.id,
    };

    client
      .graphql({
        query: mutations.deleteToken,
        variables: { input: tokenDetails },
      })
      .then(() => {
        onCloseAfterDelete();
      })
      .catch((error) => {
        console.log("Error Deleting Token: ", error);
        onClose();
      });
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete '{token.name}'
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to delete the Token ?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handleDeleteToken(token)}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default TokenDeleteConfirmationAlert;
