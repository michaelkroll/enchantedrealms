// React imports
import { useState } from "react";

// Chakra UI imports
import {
  Card,
  CardBody,
  Heading,
  Text,
  Divider,
  CardFooter,
  Button,
  Tooltip,
  ButtonGroup,
  useColorModeValue,
  Stack,
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
  const cardBorderColor = useColorModeValue("gray.300", "gray.600");
  const cardBackgroundColor = useColorModeValue("gray.50", "gray.700");

  const [isDeleteSceneConfirmModalOpen, setDeleteSceneConfirmModalOpen] =
    useState(false);

  const onDeleteSceneAlertConfirmClose = () => {
    setDeleteSceneConfirmModalOpen(false);
  };

  const onDeleteSceneAlertConfirmCloseAfterDelete = () => {
    setDeleteSceneConfirmModalOpen(false);
    refreshGrid();
  };

  return (
    <>
      <Card
        variant="outline"
        borderColor={cardBorderColor}
        backgroundColor={cardBackgroundColor}
      >
        <CardBody padding={0}>
          <Stack
            paddingLeft={3}
            paddingRight={3}
            paddingTop={1}
            paddingBottom={2}
          >
            <Heading as="h4" size="md" paddingTop="10px">
              {scene.name}
            </Heading>
            <Text paddingTop="10px">{scene.description}</Text>
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
