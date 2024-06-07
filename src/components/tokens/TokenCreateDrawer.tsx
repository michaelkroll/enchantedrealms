import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import TokenCreateForm from "./TokenCreateForm";

interface Props {
  handleDrawerClose: () => void;
  isDrawerOpen: boolean;
  onCloseDrawer: () => void;
  email: string;
  sub: string;
}

const TokenCreateDrawer = ({
  handleDrawerClose,
  isDrawerOpen,
  onCloseDrawer,
  email,
  sub,
}: Props) => {
  return (
    <Drawer
      size="md"
      variant="permanent"
      isOpen={isDrawerOpen}
      placement="right"
      onClose={onCloseDrawer}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton margin="5px" />
        <DrawerHeader borderBottomWidth="1px">Create a Token</DrawerHeader>
        <DrawerBody>
          <TokenCreateForm
            handleFormClose={handleDrawerClose}
            email={email}
            sub={sub}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default TokenCreateDrawer;
