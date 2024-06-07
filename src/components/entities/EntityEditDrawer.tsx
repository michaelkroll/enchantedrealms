import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import Entity from "../../data/Entity";
import EntityEditForm from "./EntityEditForm";

interface Props {
  handleDrawerClose: () => void;
  isDrawerOpen: boolean;
  onCloseDrawer: () => void;
  editEntity: Entity;
  email: string;
  sub: string;
}

const EntityEditDrawer = ({
  handleDrawerClose,
  isDrawerOpen,
  onCloseDrawer,
  editEntity,
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
        <DrawerHeader borderBottomWidth="1px">Edit Entity</DrawerHeader>
        <DrawerBody>
          <EntityEditForm
            handleFormClose={handleDrawerClose}
            entity={editEntity}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default EntityEditDrawer;
