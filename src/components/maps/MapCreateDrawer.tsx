import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import MapCreateForm from "./MapCreateForm";

interface Props {
  handleDrawerClose: () => void;
  isDrawerOpen: boolean;
  onCloseDrawer: () => void;
  email: string;
  sub: string;
}

const MapCreateDrawer = ({
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
        <DrawerHeader borderBottomWidth="1px">Create a Map</DrawerHeader>
        <DrawerBody>
          <MapCreateForm
            handleFormClose={handleDrawerClose}
            email={email}
            sub={sub}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MapCreateDrawer;
