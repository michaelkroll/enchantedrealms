import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import Map from "../../data/map/Map";
import MapEditForm from "./MapEditForm";

interface Props {
  handleDrawerClose: () => void;
  isDrawerOpen: boolean;
  onCloseDrawer: () => void;
  editMap: Map;
}

const MapEditDrawer = ({
  handleDrawerClose,
  isDrawerOpen,
  onCloseDrawer,
  editMap,
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
        <DrawerHeader borderBottomWidth="1px">Edit Map</DrawerHeader>
        <DrawerBody>
          <MapEditForm handleFormClose={handleDrawerClose} map={editMap} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MapEditDrawer;
