import { useRef } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLeave: () => void;
}

const CloseSceneEditorConfirmationAlert = ({
  isOpen,
  onClose,
  onLeave,
}: Props) => {
  const cancelRef = useRef(null);

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
            Close Editor
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure you want to close the Editor?</AlertDialogBody>

          <AlertDialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onLeave} ml={3}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default CloseSceneEditorConfirmationAlert;
