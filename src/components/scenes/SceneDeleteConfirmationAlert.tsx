// React imports
import { useRef } from "react";

// DynamoDB imports
import { generateClient } from "aws-amplify/api";
import * as mutations from "../../graphql/mutations";

// Chakra UI imports
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

// Custom imports
import SceneMapEntities from "../../data/compositions/SceneMapEntities";

interface Props {
  scene: SceneMapEntities;
  isOpen: boolean;
  onClose: () => void;
  onCloseAfterDelete: () => void;
}

const SceneDeleteConfirmationAlert = ({
  scene,
  isOpen,
  onClose,
  onCloseAfterDelete,
}: Props) => {
  const cancelRef = useRef(null);

  const handleDeleteScene = async (sceneToDelete: SceneMapEntities) => {
    const client = generateClient();

    const sceneDetails = {
      id: sceneToDelete.id,
    };

    client
      .graphql({
        query: mutations.deleteScene,
        variables: { input: sceneDetails },
      })
      .then(() => {
        onCloseAfterDelete();
      })
      .catch((error) => {
        console.log("Delete Scene Error: ", error);
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
