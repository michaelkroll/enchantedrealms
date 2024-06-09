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

interface Props {
  email: string;
  sub: string;
}

const SceneGrid = ({ email, sub }: Props) => {
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
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    if (email != "") {
      handleListScenes();
    }
  }, [email]);

  const handleListScenes = async () => {
    setLoading(true);
    const graphqlClient = generateClient();

    const filters = {
      filter: {
        or: [
          {
            creatorEmail: {
              eq: email,
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
    handleListScenes();
  };

  const handleEditDrawerClose = () => {
    onEditDrawerClose();
    handleListScenes();
  };

  const handleRefreshGrid = () => {
    setScenes([]);
    handleListScenes();
  };

  const handleEditScene = (editScene: Scene) => {
    setEditScene(editScene);
    onEditDrawerOpen();
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
            isDisabled={isLoading}
            colorScheme="blue"
            onClick={onCreateDrawerOpen}
            marginLeft="10px"
          >
            <AddIcon />
          </Button>
        </Tooltip>
        <Tooltip
          hasArrow
          label="Reload the Scenes"
          bg="gray.300"
          color="black"
          openDelay={1000}
        >
          <Button isDisabled={isLoading} onClick={handleRefreshGrid}>
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
