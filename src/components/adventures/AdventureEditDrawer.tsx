import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import Adventure from "../../data/Adventure";
import AdventureEditForm from "./AdventureEditForm";

interface Props {
  handleDrawerClose: () => void;
  onCloseDrawer: () => void;
  isDrawerOpen: boolean;
  editAdventure: Adventure;
}

const AdventureEditDrawer = ({
  handleDrawerClose,
  onCloseDrawer,
  isDrawerOpen,
  editAdventure,
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
        <DrawerHeader borderBottomWidth="1px">Edit Adventure</DrawerHeader>
        <DrawerBody>
          <AdventureEditForm
            handleFormClose={handleDrawerClose}
            editAdventure={editAdventure!}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AdventureEditDrawer;
