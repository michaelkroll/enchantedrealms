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
import Entity from "../../data/Entity";

interface Props {
  handleDrawerClose: () => void;
  onCloseDrawer: () => void;
  email: string;
  isDrawerOpen: boolean;
  editScene: Scene;
  editSceneEntities: Entity[]
}

const SceneEditDrawer = ({
  handleDrawerClose,
  onCloseDrawer,
  isDrawerOpen,
  editScene,
  editSceneEntities,
  email,
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
            editSceneEntities={editSceneEntities!}
            email={email}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SceneEditDrawer;
