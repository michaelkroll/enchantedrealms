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

import Map from "../../data/Map";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCloseAfterDelete: () => void;
  map: Map;
}

const MapDeleteConfirmationAlert = ({ isOpen, onClose, onCloseAfterDelete, map }: Props) => {
  const cancelRef = useRef(null);

  const handleDeleteMap = async (mapToDelete: Map) => {
    try {
      await remove({
        path: mapToDelete.mapPicPath!,
      });
    } catch (error) {
      console.log(
        "Error deleting: " + mapToDelete.mapPicPath! + "with error: " + error
      );
    }

    const client = generateClient();

    const mapDetails = {
      id: mapToDelete.id,
    };

    client
      .graphql({
        query: mutations.deleteMap,
        variables: { input: mapDetails },
      })
      .then((response) => {
        console.log("Deleted Map: ", response);
        onCloseAfterDelete();
      })
      .catch((error) => {
        console.log("Error: ", error);
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
            Delete '{map.name}'
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to delete the Map ?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handleDeleteMap(map)}
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

export default MapDeleteConfirmationAlert;
