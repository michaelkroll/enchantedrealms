import { useEffect, useState } from "react";

// Storage S3
import { getUrl } from "aws-amplify/storage";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import { listMaps } from "../../graphql/queries";
import {
  Box,
  Button,
  Center,
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
  const [maps, setMaps] = useState<Map[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    value: "all",
    label: "All",
  });

  useEffect(() => {
    if (email != "") {
      handleListMaps();
    }
  }, [email, currentCategory]);

  const handleListMaps = async () => {
    setLoading(true);
    const graphqlClient = generateClient();

    let listMapsVariables = {};

    if (currentCategory.value == "all") {
      listMapsVariables = {
        filter: {
          or: [
            {
              creatorEmail: {
                eq: email,
              },
            },
            {
              shared: {
                eq: true,
              },
            },
          ],
        },
      };
    } else {
      listMapsVariables = {
        filter: {
          and: [
            {
              or: [
                {
                  creatorEmail: {
                    eq: email,
                  },
                },
                {
                  shared: {
                    eq: true,
                  },
                },
              ],
            },
            {
              category: {
                eq: currentCategory.value,
              },
            },
          ],
        },
      };
    }

    graphqlClient
      .graphql({
        query: listMaps,
        variables: listMapsVariables,
      })
      .then((response) => {
        const mapList = response.data.listMaps.items;

        mapList.map(async (map) => {
          const mapThumbPicPath = map.mapThumbPicPath;
          const getUrlResult = await getUrl({
            path: mapThumbPicPath!,
            options: {
              expiresIn: 900,
            },
          });

          const mapThumbPicImage = getUrlResult.url.toString();
          map.mapThumbPicS3Url = mapThumbPicImage;

          const mapPicPath = map.mapPicPath;
          const getMapUrlResult = await getUrl({
            path: mapPicPath!,
            options: {
              expiresIn: 900,
            },
          });

          const mapPicImage = getMapUrlResult.url.toString();
          map.mapPicS3Url = mapPicImage;
        });

        mapList.sort((a, b) => a.name.localeCompare(b.name));

        setMaps(mapList);
        setLoading(false);
      })
      .catch((error) => {
        setMaps([]);
        setError(error);
        setLoading(false);
      });
  };

  const handleCreateDrawerClose = () => {
    onCreateDrawerClose();
    handleListMaps();
  };

  const handleEditDrawerClose = () => {
    onEditDrawerClose();
    handleListMaps();
  };

  const handleRefreshGrid = () => {
    setMaps([]);
    handleListMaps();
  };

  const handleMapCategorySelected = (selectedCategory: Category) => {
    if (selectedCategory.value == "all") {
      setCurrentCategory({ value: "all", label: "All" });
    } else {
      let cat = mapCategories.find(
        (category) => category.value === selectedCategory.value
      );

      setCurrentCategory(cat!);
    }
  };

  const handleUpdateMap = (updatedMap: Map) => {
    setMaps(
      maps.map((map) =>
        map.id === updatedMap.id ? { ...map, shared: updatedMap.shared } : map
      )
    );
  };

  const handleDeleteMap = (deletedMap: Map) => {
    const newMapArray = maps.filter((map) => map.id != deletedMap.id);
    setMaps(newMapArray);
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
        <CategorySelector
          onSelectCategory={handleMapCategorySelected}
          categories={mapCategories}
        />
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
      {error && <Text color="tomato">{error}</Text>}
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
