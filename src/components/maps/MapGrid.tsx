import { useState } from "react";

import {
  Box,
  Button,
  Center,
  Checkbox,
  HStack,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import { IoReload } from "react-icons/io5";
import MapCard from "./MapCard";
import Map from "../../data/map/Map";
import mapCategories from "../../data/map/MapCategories";
import CategorySelector from "../CategorySelector";
import Category from "../../data/Category";
import MapCreateDrawer from "./MapCreateDrawer";
import MapEditDrawer from "./MapEditDrawer";
import IsLoadingIndicator from "../IsLoadingIndicator";
import useMaps from "../../hooks/useMaps";

interface Props {
  email: string;
  sub: string;
}

const MapGrid = ({ email, sub }: Props) => {
  const {
    isOpen: isCreateDrawerOpen,
    onOpen: onCreateDrawerOpen,
    onClose: onCreateDrawerClose,
  } = useDisclosure();

  const {
    isOpen: isEditDrawerOpen,
    onOpen: onEditDrawerOpen,
    onClose: onEditDrawerClose,
  } = useDisclosure();

  const [editMap, setEditMap] = useState<Map>();

  const [mapCategory, setMapCategory] = useState<Category>({
    value: "all",
    label: "All",
  });

  const [showSharedMaps, setShowSharedMaps] = useState<boolean>(true);

  const { reloadMaps, updateMap, deleteMap, maps, isLoading, hasError, error } = useMaps(
    email,
    mapCategory.value,
    showSharedMaps
  );

  const handleCreateDrawerClose = () => {
    onCreateDrawerClose();
    reloadMaps();
  };

  const handleEditDrawerClose = () => {
    onEditDrawerClose();
    reloadMaps();
  };

  const handleRefreshGrid = () => {
    reloadMaps();
  };

  const handleUpdateMap = (updatedMap: Map) => {
    updateMap(updatedMap);
  };

  const handleDeleteMap = (deletedMap: Map) => {
    deleteMap(deletedMap);
  };

  const handleEditMap = (editMap: Map) => {
    setEditMap(editMap);
    onEditDrawerOpen();
  };

  const mapCountText = (): String => {
    if (maps.length == 1) {
      return "Map in this Category";
    } else {
      return "Maps in this Category";
    }
  };

  const handleMapCategorySelected = (selectedCategory: Category) => {
    setMapCategory(selectedCategory);
  };

  const handleMapSharedFlagSelected = (selectedFlag: boolean) => {
    setShowSharedMaps(selectedFlag);
  };

  return (
    <Box me={2} mt={2} mb={2}>
      <HStack justifyContent={"space-between"}>
        <Tooltip
          hasArrow
          label="Create a new Map"
          bg="gray.300"
          color="black"
          openDelay={1000}
        >
          <Button
            isDisabled={isLoading}
            colorScheme="blue"
            onClick={onCreateDrawerOpen}
            marginLeft="10px"
          >
            <AddIcon />
          </Button>
        </Tooltip>
        <HStack>
          <CategorySelector
            onSelectCategory={handleMapCategorySelected}
            categories={mapCategories}
          />
          <Checkbox
            id="ShowSharedCheckbox"
            defaultChecked
            ml={2}
            onChange={(e) => {
              handleMapSharedFlagSelected(e.target.checked);
            }}
          >
            Show Shared Maps
          </Checkbox>
        </HStack>
        <Tooltip
          hasArrow
          label="Reload the Maps"
          bg="gray.300"
          color="black"
          openDelay={1000}
        >
          <Button isDisabled={isLoading} onClick={handleRefreshGrid}>
            <IoReload />
          </Button>
        </Tooltip>
      </HStack>
      <Center mb={2}>
        <Text mt={2}>
          {maps.length} {mapCountText()}
        </Text>
      </Center>

      {isLoading && <IsLoadingIndicator loadingLabel={"Loading maps..."} />}

      <MapCreateDrawer
        handleDrawerClose={handleCreateDrawerClose}
        isDrawerOpen={isCreateDrawerOpen}
        onCloseDrawer={onCreateDrawerClose}
        email={email}
        sub={sub}
      />
      <MapEditDrawer
        handleDrawerClose={handleEditDrawerClose}
        isDrawerOpen={isEditDrawerOpen}
        onCloseDrawer={onEditDrawerClose}
        editMap={editMap!}
      />
      {hasError && <Text color="tomato">{error}</Text>}
      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 1, lg: 3, xl: 4, "2xl": 5 }}
        spacing={3}
        margin="10px"
      >
        {maps.map((map) => (
          <MapCard
            key={map.id}
            map={map}
            loggedInEmail={email}
            handleDeleteMap={handleDeleteMap}
            handleEditMap={handleEditMap}
            handleUpdateMap={handleUpdateMap}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MapGrid;
