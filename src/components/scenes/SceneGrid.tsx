// React Imports
import { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import { listScenes } from "../../graphql/queries";

// Storage S3
//import { getUrl } from "aws-amplify/storage";

// Chakra UI Icon Imports
import { AddIcon } from "@chakra-ui/icons";

// Chakra UI Imports
import {
  Button,
  HStack,
  SimpleGrid,
  Text,
  Tooltip,
  //useDisclosure,
  useToast,
} from "@chakra-ui/react";

// Custom Imports
import Scene from "../../data/Scene";
import SceneCardSkeleton from "./SceneCardSkeleton";
import SceneCard from "./SceneCard";

interface Props {
  email: string;
  sub: string;
}

const SceneGrid = ({ email /*sub*/ }: Props) => {
  const toast = useToast();

  //  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const skeletons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  useEffect(() => {
    if (email != "") {
      handleListScenes();
    }
  }, [email]);

  const handleListScenes = async () => {
    setLoading(true);
    const graphqlClient = generateClient();

    let listSceneVariables = {
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
        variables: listSceneVariables,
      })
      .then((response) => {
        const sceneList = response.data.listScenes.items;
        sceneList.sort((a, b) => a.name.localeCompare(b.name));
        setScenes(sceneList);
        setLoading(false);
      })
      .catch((error) => {
        setScenes([]);
        setError(error);
        setLoading(false);
      });
  };

  const handleRefreshGrid = () => {
    setScenes([]);
    handleListScenes();
  };

  const handleDeleteScene = (deletedScene: Scene) => {
    const newScenesArray = scenes.filter(
      (scene) => scene.id != deletedScene.id
    );
    setScenes(newScenesArray);
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
            onClick={() =>
              toast({
                title: "Add a new Scene.",
                description:
                  "Stay tuned. Implementing the functionality right now.",
                status: "warning",
                position: "top",
                duration: 3000,
                isClosable: true,
              })
            }
            marginLeft="10px"
          >
            <AddIcon />
          </Button>
        </Tooltip>
        {/* <CategorySelector
      selectedCategory={currentCategory}
      onSelectCategory={handleEntityCategorySelected}
      categories={entityCategories}
    /> */}
        <Tooltip
          hasArrow
          label="Reload the Entities"
          bg="gray.300"
          color="black"
          openDelay={1000}
        >
          <Button isDisabled={isLoading} onClick={handleRefreshGrid}>
            <IoReload />
          </Button>
        </Tooltip>
      </HStack>
      {error && <Text color="tomato">{error}</Text>}
      <SimpleGrid
        columns={{ base: 2, sm: 2, md: 3, lg: 5, xl: 6, "2xl": 8 }}
        spacing={3}
        margin="10px"
      >
        {isLoading &&
          skeletons.map((skeleton) => <SceneCardSkeleton key={skeleton} />)}
        {scenes.map((scene) => (
          <SceneCard
            key={scene.id}
            scene={scene}
            deleteScene={handleDeleteScene}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default SceneGrid;
