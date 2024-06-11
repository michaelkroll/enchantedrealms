// React imports
import { useEffect, useState } from "react";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import { listScenes } from "../../graphql/queries";

// CHakra UI imports
import {
  Button,
  HStack,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";

// React Icon imports
import { AddIcon } from "@chakra-ui/icons";
import { IoReload } from "react-icons/io5";

// Custom imports
import SceneCard from "./SceneCard";
import SceneCardSkeleton from "./SceneCardSkeleton";
import Scene from "../../data/Scene";

import SceneCreateDrawer from "./SceneCreateDrawer";
import SceneEditDrawer from "./SceneEditDrawer";
import AdventureSelectorDropdown from "../adventures/AdventureSelectorDropdown";
import Adventure from "../../data/Adventure";

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

  const [editScene, setEditScene] = useState<Scene>();
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [selectedAdventure, setSelectedAdventure] = useState<Adventure>();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {

  }, [adventures])

  useEffect(() => {
    if (selectedAdventure) {
      handleListScenes(selectedAdventure);
    }
  }, [selectedAdventure]);

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

    graphqlClient
      .graphql({
        query: listScenes,
        variables: filters,
      })
      .then((response) => {
        const sceneList = response.data.listScenes.items;
        sceneList.sort((a, b) => a.name.localeCompare(b.name));
        setScenes(sceneList);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error loading scenes: ", error);
        setScenes([]);
        setError(error);
        setLoading(false);
      });
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

  const handleEditScene = (editScene: Scene) => {
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
            isDisabled={isLoading || adventures.length == 0}
            colorScheme="blue"
            onClick={onCreateDrawerOpen}
            marginLeft="10px"
          >
            <AddIcon />
          </Button>
        </Tooltip>

        <Text as="b" display={adventures.length == 0 ? "flex" : "none"}>
          Please create at least one Adventure before you can add Scenes.
        </Text>

        <AdventureSelectorDropdown
          display={adventures.length == 0 ? "none" : "flex"}
          onSelectAdventure={handleAdventureSelected}
          adventures={adventures}
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

      {error && <Text color="tomato">{error}</Text>}
      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 1, lg: 3, xl: 4, "2xl": 5 }}
        spacing={3}
        margin="10px"
      >
        {isLoading &&
          skeletons.map((skeleton) => <SceneCardSkeleton key={skeleton} />)}
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
