// React imports
import { useState } from "react";

// React Icon imports
import { MdOutlineEditNote, MdOutlineDelete } from "react-icons/md";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

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
import Entity from "../../data/entity/Entity";
import entityCategories from "../../data/entity/EntityCategories";
import EntityDisplayModal from "./EntityDisplayModal";

interface Props {
  entity: Entity;
  handleEditEntity: (entity: Entity) => void;
  handleDeleteEntity: (entity: Entity) => void;
}

const EntityCard = ({
  entity,
  handleEditEntity,
  handleDeleteEntity,
}: Props) => {
  const cardBorderColor = useColorModeValue("gray.300", "gray.600");
  const cardBackgroundColor = useColorModeValue("gray.50", "gray.700");

  const [isShowFullsizeEntityModalOpen, setShowFullsizeEntityModalOpen] =
    useState(false);

  const [isDeleteEntityConfirmModalOpen, setDeleteEntityConfirmModalOpen] =
    useState(false);

  const onDeleteEntityAlertConfirmClose = () => {
    setDeleteEntityConfirmModalOpen(false);
  };

  const onDeleteEntityAlertConfirmCloseAfterDelete = () => {
    setDeleteEntityConfirmModalOpen(false);
    handleDeleteEntity(entity);
  };

  const categoryLabel = (categoryValue: string): string | undefined => {
    return entityCategories.find((category) => category.value === categoryValue)
      ?.label;
  };

  const onFullSizeEntityClose = () => {
    setShowFullsizeEntityModalOpen(false);
  };

  return (
    <>
      <Card
        variant="outline"
        borderColor={cardBorderColor}
        backgroundColor={cardBackgroundColor}
      >
        <CardBody padding={3}>
          <Image src={entity.tokenPicS3Url!} borderRadius="lg" draggable="false"/>
          <Heading size="sm" paddingTop={2}>
            {entity.name}
          </Heading>
          <Text fontSize="xs" textColor="gray.500" mb={2}>
            Category: {categoryLabel(entity.category!)}
          </Text>
          <Divider mb={2} />
          <Text noOfLines={4} fontSize="sm">
            {entity.description}
          </Text>
        </CardBody>
        <Divider />
        <CardFooter padding={2}>
          <ButtonGroup size="sm" isAttached>
            <Tooltip
              hasArrow
              label="Edit the Entity"
              bg="gray.300"
              color="black"
              openDelay={1000}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleEditEntity(entity);
                }}
              >
                <MdOutlineEditNote />
              </Button>
            </Tooltip>
            <Tooltip
              hasArrow
              label="Show the Entity details on a dedicated screen"
              bg="gray.300"
              color="black"
              openDelay={1000}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowFullsizeEntityModalOpen(true);
                }}
              >
                <HiOutlineMagnifyingGlass />
              </Button>
            </Tooltip>
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
      <EntityDisplayModal
        entity={entity}
        isOpen={isShowFullsizeEntityModalOpen}
        onClose={() => {
          onFullSizeEntityClose();
        }}
      />
    </>
  );
};

export default EntityCard;
