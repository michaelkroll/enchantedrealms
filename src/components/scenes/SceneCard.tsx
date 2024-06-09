// React imports
import { useEffect, useState } from "react";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import { getAdventure, getMap } from "../../graphql/queries";

// Storage S3
import { getUrl } from "aws-amplify/storage";

// Chakra UI imports
import {
  Card,
  CardBody,
  Heading,
  Text,
  Divider,
  Image,
  CardFooter,
  Button,
  Tooltip,
  ButtonGroup,
  useColorModeValue,
  Stack,
  HStack,
} from "@chakra-ui/react";

// React Icon imports
import { MdOutlineDelete, MdOutlineEditNote } from "react-icons/md";

// Custom imports
import Scene from "../../data/Scene";
import SceneDeleteConfirmationAlert from "./SceneDeleteConfirmationAlert";

interface Props {
  scene: Scene;
  loggedInEmail: string;
  handleEditScene: (adventure: Scene) => void;
  refreshGrid: () => void;
}

const SceneCard = ({
  scene,
  loggedInEmail,
  handleEditScene,
  refreshGrid,
}: Props) => {
  useEffect(() => {
    loadAdventureDetails();
    loadMapDetails();
  }, []);

  const cardBorderColor = useColorModeValue("gray.300", "gray.600");
  const cardBackgroundColor = useColorModeValue("gray.50", "gray.700");

  const [isDeleteSceneConfirmModalOpen, setDeleteSceneConfirmModalOpen] =
    useState(false);

  const [adventureName, setAdventureName] = useState("");
  const [mapName, setMapName] = useState("");
  const [mapImageUrl, setMapImageUrl] = useState("");

  const onDeleteSceneAlertConfirmClose = () => {
    setDeleteSceneConfirmModalOpen(false);
  };

  const onDeleteSceneAlertConfirmCloseAfterDelete = () => {
    setDeleteSceneConfirmModalOpen(false);
    refreshGrid();
  };

  const loadAdventureDetails = () => {
    const graphqlClient = generateClient();
    graphqlClient
      .graphql({
        query: getAdventure,
        variables: { id: scene.adventureId! },
      })
      .then((response) => {
        const adventure = response.data.getAdventure;
        setAdventureName(adventure?.name!);
      })
      .catch((error) => {
        console.log("Error loading Adventure details: ", error);
      });
  };

  const loadMapDetails = () => {
    const graphqlClient = generateClient();
    graphqlClient
      .graphql({
        query: getMap,
        variables: { id: scene.mapId! },
      })
      .then((response) => {
        const map = response.data.getMap;
        setMapName(map?.name!);
        const mapPicPath = map?.mapPicPath!;

        getUrl({
          path: mapPicPath,
          options: {
            expiresIn: 900,
          },
        })
          .then((getUrlResponse) => {
            setMapImageUrl(getUrlResponse.url.toString());
          })
          .catch((error) => {
            console.log("Error reading the MapImageUrl: ", error);
          });
      })
      .catch((error) => {
        console.log("Error loading Map details: ", error);
      });
  };

  return (
    <>
      <Card
        variant="outline"
        borderColor={cardBorderColor}
        backgroundColor={cardBackgroundColor}
        onClick={() => {
          console.log(scene);
        }}
      >
        <CardBody padding={0}>
        <Image mb={1} src={mapImageUrl} borderTopRadius={4} />
          <Stack
            paddingLeft={3}
            paddingRight={3}
            paddingTop={2}
            paddingBottom={2}
          >
            <Heading as="h4" size="md" paddingTop="10px">
              {scene.name}
            </Heading>
            <Text>{scene.description}</Text>
            <Divider/>
            <Text as="b">Adventure</Text>
            <Text>{adventureName}</Text>
            <Divider/>
            <Text as="b">Map</Text>
            <Text>{mapName}</Text>

          </Stack>
        </CardBody>
        <Divider />
        <CardFooter padding={2}>
          <ButtonGroup ml={2} size="sm" isAttached>
            <Tooltip
              hasArrow
              label="Edit the Scene"
              bg="gray.300"
              color="black"
              openDelay={1000}
            >
              <Button
                display={loggedInEmail == scene.creatorEmail ? "" : "none"}
                variant="outline"
                size="sm"
                onClick={() => {
                  handleEditScene(scene);
                }}
              >
                <MdOutlineEditNote />
              </Button>
            </Tooltip>
            <Tooltip
              hasArrow
              label="Delete the Scene"
              bg="gray.300"
              color="black"
              openDelay={1000}
            >
              <Button
                display={loggedInEmail == scene.creatorEmail ? "" : "none"}
                variant="outline"
                size="sm"
                onClick={() => {
                  setDeleteSceneConfirmModalOpen(true);
                }}
              >
                <MdOutlineDelete />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <SceneDeleteConfirmationAlert
        scene={scene}
        isOpen={isDeleteSceneConfirmModalOpen}
        onClose={onDeleteSceneAlertConfirmClose}
        onCloseAfterDelete={onDeleteSceneAlertConfirmCloseAfterDelete}
      />
    </>
  );
};

export default SceneCard;
