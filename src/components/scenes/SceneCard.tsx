// React imports
import { useState } from "react";

// React Icon imports
import { MdOutlineEditNote, MdOutlineDelete } from "react-icons/md";

// Chakra UI imports
import {
  Card,
  CardBody,
  Heading,
  Button,
  CardFooter,
  Divider,
  Text,
  Stack,
  ButtonGroup,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom imports
//import EntityDeleteConfirmationAlert from "./EntityDeleteConfirmationAlert";
import Scene from "../../data/Scene";
import SceneDeleteConfirmationAlert from "./SceneDeleteConfirmationAlert";
//import entityCategories from "../../data/EntityCategories";

interface Props {
  scene: Scene;
  deleteScene: (entity: Scene) => void;
}

const SceneCard = ({ scene, deleteScene }: Props) => {
  const cardBorderColor = useColorModeValue("gray.300", "gray.600");
  const cardBackgroundColor = useColorModeValue("gray.50", "gray.700");

  const [isDeleteSceneConfirmModalOpen, setDeleteSceneConfirmModalOpen] =
    useState(false);

  const onDeleteSceneAlertConfirmClose = () => {
    setDeleteSceneConfirmModalOpen(false);
  };

  const onDeleteSceneAlertConfirmCloseAfterDelete = () => {
    setDeleteSceneConfirmModalOpen(false);
    deleteScene(scene);
  };

  // const categoryLabel = (categoryValue: string): string | undefined => {
  //   return entityCategories.find((category) => category.value === categoryValue)
  //     ?.label;
  // };

  return (
    <>
      <Card
        variant="outline"
        borderColor={cardBorderColor}
        backgroundColor={cardBackgroundColor}
      >
        <CardBody>
          <Stack mt="6" spacing="1">
            <Heading size="sm">{scene.name}</Heading>
            <Text fontSize="sm">{scene.description}</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup size="sm" isAttached>
            <Button
              isDisabled={true}
              variant="outline"
              leftIcon={<MdOutlineEditNote />}
              size="sm"
            >
              Edit
            </Button>
            <Tooltip
              hasArrow
              label="Delete the Entity"
              bg="gray.300"
              color="black"
              openDelay={1000}
            >
              <Button
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
