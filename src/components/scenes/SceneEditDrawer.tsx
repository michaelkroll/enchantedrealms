// CHakra UI imports
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

// Custom imports
import Scene from "../../data/Scene";
import SceneEditForm from "./SceneEditForm";

interface Props {
  handleDrawerClose: () => void;
  onCloseDrawer: () => void;
  email: string;
  isDrawerOpen: boolean;
  editScene: Scene;
}

const SceneEditDrawer = ({
  handleDrawerClose,
  onCloseDrawer,
  isDrawerOpen,
  editScene,
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
        <DrawerHeader borderBottomWidth="1px">Edit Scene</DrawerHeader>
        <DrawerBody>
          <SceneEditForm
            handleFormClose={handleDrawerClose}
            editScene={editScene!}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SceneEditDrawer;
