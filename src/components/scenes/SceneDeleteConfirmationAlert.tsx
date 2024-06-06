import { useRef } from "react";

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

import Scene from "../../data/Scene";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCloseAfterDelete: () => void;
  scene: Scene;
}

const SceneDeleteConfirmationAlert = ({
  isOpen,
  onClose,
  onCloseAfterDelete,
  scene,
}: Props) => {
  const cancelRef = useRef(null);

  const handleDeleteScene = async (sceneToDelete: Scene) => {
    const client = generateClient();

    const sceneDetails = {
      id: sceneToDelete.id,
    };

    client
      .graphql({
        query: mutations.deleteScene,
        variables: { input: sceneDetails },
      })
      .then((response) => {
        console.log("Deleted Scene: ", response);
        onCloseAfterDelete();
      })
      .catch((error) => {
        console.log("Deleting Scene Error: ", error);
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
            Delete '{scene.name}'
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to delete the Scene ?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handleDeleteScene(scene)}
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

export default SceneDeleteConfirmationAlert;
