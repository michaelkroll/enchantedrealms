// React imports
import { useEffect, useState } from "react";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import { getMap, getEntity } from "../../graphql/queries";

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
  List,
  ListItem,
  HStack,
  ListIcon,
} from "@chakra-ui/react";

// React Icon imports
import { MdOutlineDelete, MdOutlineEditNote } from "react-icons/md";
import { FaRegUser, FaUser } from "react-icons/fa6";
import {
  GiMonsterGrasp,
  GiBatteredAxe,
  GiBorderedShield,
} from "react-icons/gi";
import { VscWorkspaceUnknown } from "react-icons/vsc";

// Custom imports
import Scene from "../../data/Scene";
import SceneDeleteConfirmationAlert from "./SceneDeleteConfirmationAlert";
import Entity from "../../data/Entity";
import { IconType } from "react-icons";

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
    loadMapDetails();
    loadEntityDetails();
  }, []);

  const cardBorderColor = useColorModeValue("gray.300", "gray.600");
  const cardBackgroundColor = useColorModeValue("gray.50", "gray.700");

  const [isDeleteSceneConfirmModalOpen, setDeleteSceneConfirmModalOpen] =
    useState(false);

  const [mapName, setMapName] = useState("");
  const [entities, setEntities] = useState<Entity[]>([]);
  const [mapImageUrl, setMapImageUrl] = useState("");

  const onDeleteSceneAlertConfirmClose = () => {
    setDeleteSceneConfirmModalOpen(false);
  };

  const onDeleteSceneAlertConfirmCloseAfterDelete = () => {
    setDeleteSceneConfirmModalOpen(false);
    refreshGrid();
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

  const loadEntityDetails = () => {
    let entityArray: Entity[] = [];

    scene.entityIds!.forEach((entityId) => {
      const graphqlClient = generateClient();
      graphqlClient
        .graphql({
          query: getEntity,
          variables: { id: entityId! },
        })
        .then((response) => {
          const entity = response.data.getEntity;
          entityArray.push(entity!);
        })
        .catch((error) => {
          console.log("Error loading Entity details: ", error);
        });
    });

    const sortedArray = entityArray.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setEntities(sortedArray);
  };

  const getEntityIcon = (entityCategory: string): IconType => {
    if (entityCategory == "monster") {
      return GiMonsterGrasp;
    } else if (entityCategory == "player") {
      return FaUser;
    } else if (entityCategory == "npc") {
      return FaRegUser;
    } else if (entityCategory == "weapon") {
      return GiBatteredAxe;
    } else if (entityCategory == "item") {
      return GiBorderedShield;
    } else {
      return VscWorkspaceUnknown;
    }
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
          <Stack>
            <Text
              textColor="gray.300"
              backgroundColor="gray.800"
              position="absolute"
              left="5px"
              top="5px"
              paddingLeft="10px"
              paddingRight="10px"
              paddingTop="2px"
              paddingBottom="2px"
              borderRadius={10}
            >
              {mapName}
            </Text>
            <Image
              mb={1}
              src={mapImageUrl}
              borderTopRadius={4}
              minH="200"
              minW="300"
            />
          </Stack>
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
            <Divider />
            <Text as="b">Entities</Text>

            <List spacing={3} padding={1}>
              {entities.map((entity) => (
                <ListItem key={entity.id}>
                  <HStack>
                    <ListIcon
                      as={getEntityIcon(entity.category!)}
                      color="gray.500"
                    />

                    <Text>{entity.name}</Text>
                  </HStack>
                </ListItem>
              ))}
            </List>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter padding={2}>
          <ButtonGroup size="sm" isAttached>
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
