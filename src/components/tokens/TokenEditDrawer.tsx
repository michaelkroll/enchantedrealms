import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import Token from "../../data/Token";
import TokenEditForm from "./TokenEditForm";

interface Props {
  handleDrawerClose: () => void;
  isDrawerOpen: boolean;
  onCloseDrawer: () => void;
  editToken: Token;
}

const TokenEditDrawer = ({
  handleDrawerClose,
  isDrawerOpen,
  onCloseDrawer,
  editToken,
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
        <DrawerHeader borderBottomWidth="1px">Edit Token</DrawerHeader>
        <DrawerBody>
          <TokenEditForm
            handleFormClose={handleDrawerClose}
            token={editToken}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default TokenEditDrawer;
