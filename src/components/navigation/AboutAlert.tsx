import { useRef } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Divider,
  Text,
  Image,
  useColorMode,
  HStack,
} from "@chakra-ui/react";

import blackLogo from "../../assets/EnchantedRealmsLogoBlack.svg";
import whiteLogo from "../../assets/EnchantedRealmsLogoWhite.svg";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AboutAlert = ({ isOpen, onClose }: Props) => {
  const cancelRef = useRef(null);
  const { colorMode } = useColorMode();

  const getLogo = (): string => {
    return colorMode == "dark" ? whiteLogo : blackLogo;
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
            <HStack>
              <Image boxSize="30px" src={getLogo()} />
              <Text>Enchanted Realms</Text>
            </HStack>
          </AlertDialogHeader>
          <Divider />
          <AlertDialogBody>
            <Text>
              Enchanted Realms is a Virtual Table Top implementation with a
              featureset down to the bare minimum. Whatever this means.
            </Text>
          </AlertDialogBody>
          <Divider />
          <AlertDialogFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AboutAlert;
