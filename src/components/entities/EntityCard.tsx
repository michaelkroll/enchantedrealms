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
  Image,
  Text,
  ButtonGroup,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom imports
import EntityDeleteConfirmationAlert from "./EntityDeleteConfirmationAlert";
import Entity from "../../data/Entity";
import entityCategories from "../../data/EntityCategories";

interface Props {
  entity: Entity;
  deleteEntity: (entity: Entity) => void;
}

const EntityCard = ({ entity, deleteEntity }: Props) => {
  const cardBorderColor = useColorModeValue("gray.300", "gray.600");
  const cardBackgroundColor = useColorModeValue("gray.50", "gray.700");

  const [isDeleteEntityConfirmModalOpen, setDeleteEntityConfirmModalOpen] =
    useState(false);

  const onDeleteEntityAlertConfirmClose = () => {
    setDeleteEntityConfirmModalOpen(false);
  };

  const onDeleteEntityAlertConfirmCloseAfterDelete = () => {
    setDeleteEntityConfirmModalOpen(false);
    deleteEntity(entity);
  };

  const categoryLabel = (categoryValue: string): string | undefined => {
    return entityCategories.find((category) => category.value === categoryValue)
      ?.label;
  };

  return (
    <>
      <Card
        variant="outline"
        borderColor={cardBorderColor}
        backgroundColor={cardBackgroundColor}
      >
        <CardBody padding={3}>
          <Image src={entity.tokenPicS3Url!} borderRadius="lg" />
          <Heading size="sm" paddingTop={2}>{entity.name}</Heading>
          <Text fontSize="sm">{entity.description}</Text>
          <Text fontSize="xs" textColor="gray.500">
            Category: {categoryLabel(entity.category!)}
          </Text>
        </CardBody>
        <Divider />
        <CardFooter padding={2}>
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
                  setDeleteEntityConfirmModalOpen(true);
                }}
              >
                <MdOutlineDelete />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <EntityDeleteConfirmationAlert
        entity={entity}
        isOpen={isDeleteEntityConfirmModalOpen}
        onClose={onDeleteEntityAlertConfirmClose}
        onCloseAfterDelete={onDeleteEntityAlertConfirmCloseAfterDelete}
      />
    </>
  );
};

export default EntityCard;
