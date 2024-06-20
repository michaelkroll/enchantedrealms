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
  adventureName: string;
  isOpen: boolean;
  onClose: () => void;
  onLeave: () => void;
}

const LeaveRoomConfirmationAlert = ({
  adventureName,
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
            Leave the Adventure '{adventureName}'
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure you want to leave?</AlertDialogBody>

          <AlertDialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onLeave} ml={3}>
              Leave
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default LeaveRoomConfirmationAlert;
