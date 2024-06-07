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
  email: string;
  sub: string;
}

const TokenEditDrawer = ({
  handleDrawerClose,
  isDrawerOpen,
  onCloseDrawer,
  editToken,
}: // email,
// sub,
Props) => {
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
            // email={email}
            // sub={sub}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default TokenEditDrawer;
