// Chakra UI imports
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

// Custom imports
import SceneCreateForm from "./SceneCreateForm";

interface Props {
  handleDrawerClose: () => void;
  isDrawerOpen: boolean;
  onCloseDrawer: () => void;
  email: string;
  sub: string;
}

const SceneCreateDrawer = ({
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
        <DrawerHeader borderBottomWidth="1px">Create a Scene</DrawerHeader>
        <DrawerBody>
          <SceneCreateForm
            handleFormClose={handleDrawerClose}
            email={email}
            sub={sub}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SceneCreateDrawer;
