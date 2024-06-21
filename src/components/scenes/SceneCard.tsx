// React imports
import { useState } from "react";

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

import {
  GiMonsterGrasp,
  GiBatteredAxe,
  GiBorderedShield,
} from "react-icons/gi";

import { MdOutlineDelete, MdOutlineEditNote } from "react-icons/md";
import { FaRegUser, FaUser } from "react-icons/fa6";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { IconType } from "react-icons";
import { PiPathBold } from "react-icons/pi";

// Custom imports
import SceneDeleteConfirmationAlert from "./SceneDeleteConfirmationAlert";
import SceneMapEntities from "../../data/SceneMapEntities";
import { useNavigate } from "react-router-dom";

interface Props {
  scene: SceneMapEntities;
  loggedInEmail: string;
  handleEditScene: (scene: SceneMapEntities) => void;
  refreshGrid: () => void;
}

const SceneCard = ({
  scene,
  loggedInEmail,
  handleEditScene,
  refreshGrid,
}: Props) => {
  const cardBorderColor = useColorModeValue("gray.300", "gray.600");
  const cardBackgroundColor = useColorModeValue("gray.50", "gray.700");

  const navigate = useNavigate();

  const [isDeleteSceneConfirmModalOpen, setDeleteSceneConfirmModalOpen] =
    useState(false);

  const onDeleteSceneAlertConfirmClose = () => {
    setDeleteSceneConfirmModalOpen(false);
  };

  const onDeleteSceneAlertConfirmCloseAfterDelete = () => {
    setDeleteSceneConfirmModalOpen(false);
    refreshGrid();
  };

  const navigateToVisualSceneEditor = () => {
    navigate("/scene/" + scene.id);
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
        onClick={() => console.log(scene)}
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
              {scene.mapName}
            </Text>
            <Image
              mb={1}
              src={scene.mapPicS3Url!}
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
              {scene.entities?.map((entity) => (
                <ListItem key={entity!.id}>
                  <HStack>
                    <ListIcon
                      as={getEntityIcon(entity!.category!)}
                      color="gray.500"
                    />

                    <Text>{entity!.name}</Text>
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
              label="Visually plan the Scene"
              bg="gray.300"
              color="black"
              openDelay={1000}
            >
              <Button
                display={loggedInEmail == scene.creatorEmail ? "" : "none"}
                variant="outline"
                size="sm"
                onClick={() => {
                  navigateToVisualSceneEditor()
                }}
              >
                <PiPathBold />
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
