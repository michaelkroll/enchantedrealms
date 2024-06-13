// React imports
import { useEffect, useState } from "react";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import {
  listScenes,
  getMap,
  getEntity,
  getAdventure,
} from "../../graphql/queries";

// Storage S3
import { getUrl } from "aws-amplify/storage";

// CHakra UI imports
import {
  Button,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";

// React Icon imports
import { AddIcon } from "@chakra-ui/icons";
import { IoReload } from "react-icons/io5";

// Custom imports
import SceneCard from "./SceneCard";
import SceneCreateDrawer from "./SceneCreateDrawer";
import SceneEditDrawer from "./SceneEditDrawer";
import AdventureSelectorDropdown from "../adventures/AdventureSelectorDropdown";
import Adventure from "../../data/Adventure";
import Entity from "../../data/Entity";
import SceneMapEntities from "../../data/SceneMapEntities";
import IsLoadingIndicator from "../IsLoadingIndicator";

interface Props {
  email: string;
  sub: string;
  adventures: Adventure[];
}

const SceneGrid = ({ email, sub, adventures }: Props) => {
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

  const [editScene, setEditScene] = useState<SceneMapEntities>();
  const [scenes, setScenes] = useState<SceneMapEntities[]>([]);
  const [selectedAdventure, setSelectedAdventure] = useState<Adventure>();
  //const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [fetchedScenes, setFetchedScenes] = useState<SceneMapEntities[]>([]);
  const [fetchedScenesAndMaps, setFetchedScenesAndMaps] = useState<
    SceneMapEntities[]
  >([]);

  useEffect(() => {
    if (selectedAdventure) {
      handleListScenes(selectedAdventure);
    }
  }, [selectedAdventure]);

  useEffect(() => {
    handleListMapsForScenes();
  }, [fetchedScenes]);

  useEffect(() => {
    handleListEntitiesForScenesAndMaps();
    setLoading(false);
  }, [fetchedScenesAndMaps]);

  const handleListScenes = async (adventure: Adventure) => {
    setLoading(true);
    const graphqlClient = generateClient();

    const filters = {
      filter: {
        and: [
          {
            creatorEmail: {
              eq: email,
            },
          },
          {
            adventureId: {
              eq: adventure.id,
            },
          },
        ],
      },
    };

    let sceneMapEntitiesArray: SceneMapEntities[] = [];

    const response = await graphqlClient.graphql({
      query: listScenes,
      variables: filters,
    });

    const sceneList = response.data.listScenes.items;
    sceneList.sort((a, b) => a.name.localeCompare(b.name));

    for (const scene of sceneList) {
      sceneMapEntitiesArray.push(scene);
    }

    for (const scene of sceneMapEntitiesArray) {
      const response = await graphqlClient.graphql({
        query: getAdventure,
        variables: { id: scene.adventureId! },
      });

      const adventure = response.data.getAdventure!;
      scene.adventureName = adventure.name;
    }
    setFetchedScenes(sceneMapEntitiesArray);
  };

  const handleListMapsForScenes = async () => {
    let sceneMapEntitiesArray: SceneMapEntities[] = [];
    const graphqlClient = generateClient();
    for (const scene of fetchedScenes) {
      const response = await graphqlClient.graphql({
        query: getMap,
        variables: { id: scene.mapId! },
      });

      const map = response.data.getMap;
      const mapPicPath = map?.mapPicPath!;
      const mapName = map?.name;
      scene.mapName = mapName!;
      scene.mapPicPath = mapPicPath;

      const getUrlResult = await getUrl({
        path: mapPicPath!,
        options: {
          expiresIn: 900,
        },
      });

      const mapPicS3Url = getUrlResult.url.toString();
      scene.mapPicS3Url = mapPicS3Url!;
      sceneMapEntitiesArray.push(scene);
    }
    setFetchedScenesAndMaps(sceneMapEntitiesArray);
  };

  const handleListEntitiesForScenesAndMaps = async () => {
    let sceneMapEntitiesArray: SceneMapEntities[] = [];
    const graphqlClient = generateClient();

    for (const scene of fetchedScenesAndMaps) {
      let entityArray: Entity[] = [];
      for (const entityId of scene.entityIds!) {
        const response = await graphqlClient.graphql({
          query: getEntity,
          variables: { id: entityId! },
        });

        const entity = response.data.getEntity!;
        const getUrlResult = await getUrl({
          path: entity?.tokenPicPath!,
          options: {
            expiresIn: 900,
          },
        });

        const tokenPicS3Url = getUrlResult.url.toString();
        entity.tokenPicS3Url = tokenPicS3Url!;
        entityArray.push(entity);
      }
      scene.entities = entityArray;
      sceneMapEntitiesArray.push(scene);
    }
    setScenes(sceneMapEntitiesArray);
  };

  const handleCreateDrawerClose = () => {
    onCreateDrawerClose();
    if (selectedAdventure) {
      handleListScenes(selectedAdventure!);
    }
  };

  const handleEditDrawerClose = () => {
    onEditDrawerClose();
    if (selectedAdventure) {
      handleListScenes(selectedAdventure!);
    }
  };

  const handleRefreshGrid = () => {
    if (selectedAdventure) {
      setScenes([]);
      handleListScenes(selectedAdventure!);
    }
  };

  const handleEditScene = (editScene: SceneMapEntities) => {
    setEditScene(editScene);
    onEditDrawerOpen();
  };

  const handleAdventureSelected = (adventure: Adventure) => {
    setSelectedAdventure(adventure);
  };

  return (
    <>
      <HStack justifyContent={"space-between"}>
        <Tooltip
          hasArrow
          label="Create a new Scene"
          bg="gray.300"
          color="black"
          openDelay={1000}
        >
          <Button
            isDisabled={
              isLoading ||
              adventures.filter((adventure) => adventure.creatorEmail == email)
                .length == 0
            }
            colorScheme="blue"
            onClick={onCreateDrawerOpen}
            marginLeft="10px"
          >
            <AddIcon />
          </Button>
        </Tooltip>

        <Text
          as="b"
          display={
            adventures.filter((adventure) => adventure.creatorEmail == email)
              .length == 0
              ? "flex"
              : "none"
          }
        >
          Please create at least one Adventure before you can add Scenes.
        </Text>

        <AdventureSelectorDropdown
          display={
            adventures.filter((adventure) => adventure.creatorEmail == email)
              .length == 0
              ? "none"
              : "flex"
          }
          onSelectAdventure={handleAdventureSelected}
          adventures={adventures.filter(
            (adventure) => adventure.creatorEmail == email
          )}
        />

        <Tooltip
          hasArrow
          label="Reload the Scenes"
          bg="gray.300"
          color="black"
          openDelay={1000}
        >
          <Button
            isDisabled={isLoading || selectedAdventure == null}
            onClick={() => {
              if (selectedAdventure) {
                handleRefreshGrid();
              }
            }}
          >
            <IoReload />
          </Button>
        </Tooltip>
      </HStack>

      {isLoading && (
        <Stack mt={2}>
          <IsLoadingIndicator loadingLabel={"Loading scenes..."} />
        </Stack>
      )}

      <SceneCreateDrawer
        handleDrawerClose={handleCreateDrawerClose}
        isDrawerOpen={isCreateDrawerOpen}
        onCloseDrawer={onCreateDrawerClose}
        email={email}
        sub={sub}
      />

      <SceneEditDrawer
        handleDrawerClose={handleEditDrawerClose}
        isDrawerOpen={isEditDrawerOpen}
        onCloseDrawer={onEditDrawerClose}
        email={email}
        editScene={editScene!}
      />

      {/* {error && <Text color="tomato">{error}</Text>} */}
      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 1, lg: 3, xl: 4, "2xl": 5 }}
        spacing={3}
        margin="10px"
      >
        {scenes.map((scene) => (
          <SceneCard
            key={scene.id}
            scene={scene}
            loggedInEmail={email}
            refreshGrid={handleRefreshGrid}
            handleEditScene={handleEditScene}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default SceneGrid;
