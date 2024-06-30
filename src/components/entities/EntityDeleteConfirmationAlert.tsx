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

import Entity from "../../data/entity/Entity";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCloseAfterDelete: () => void;
  entity: Entity;
}

const EntityDeleteConfirmationAlert = ({
  isOpen,
  onClose,
  onCloseAfterDelete,
  entity,
}: Props) => {
  const cancelRef = useRef(null);

  const handleDeleteEntity = async (entityToDelete: Entity) => {
    const client = generateClient();

    const entityDetails = {
      id: entityToDelete.id,
    };

    client
      .graphql({
        query: mutations.deleteEntity,
        variables: { input: entityDetails },
      })
      .then(() => {
        onCloseAfterDelete();
      })
      .catch((error) => {
        console.log("Deleting Entity Error: ", error);
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
            Delete '{entity.name}'
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to delete the Entity ?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handleDeleteEntity(entity)}
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

export default EntityDeleteConfirmationAlert;
