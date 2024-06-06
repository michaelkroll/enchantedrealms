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
import Adventure from "../../data/Adventure";

interface Props {
  adventure: Adventure;
  isOpen: boolean;
  onClose: () => void;
  onCloseAfterDelete: () => void;
}

const AdventureDeleteConfirmationAlert = ({
  adventure,
  isOpen,
  onClose,
  onCloseAfterDelete,
}: Props) => {
  const cancelRef = useRef(null);

  const handleDeleteAdventure = async (adventureToDelete: Adventure) => {
    try {
      await remove({
        path: adventureToDelete.adventurePicPath!,
      });
    } catch (error) {
      console.log(
        "Error deleting: " +
          adventureToDelete.adventurePicPath! +
          "with error: " +
          error
      );
    }

    const client = generateClient();

    const adventureDetails = {
      id: adventureToDelete.id,
    };

    client
      .graphql({
        query: mutations.deleteAdventure,
        variables: { input: adventureDetails },
      })
      .then((response) => {
        console.log("Deleted Adventure: ", response);
        onCloseAfterDelete();
      })
      .catch((error) => {
        console.log("Delete Error: ", error);
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
            Delete '{adventure.name}'
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to delete the Adventure ?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handleDeleteAdventure(adventure)}
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

export default AdventureDeleteConfirmationAlert;
