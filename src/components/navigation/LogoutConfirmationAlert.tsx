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
  onLogout: () => void;
}

const LogoutConfirmationAlert = ({ isOpen, onClose, onLogout }: Props) => {
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
            Logout
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to logout from Enchanted Realms?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onLogout} ml={3}>
              Logout
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default LogoutConfirmationAlert;
