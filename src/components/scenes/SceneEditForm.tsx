// React imports
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Chakra UI imports
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
  VStack,
  FormErrorMessage,
  Container,
  Center,
  Divider,
  Text,
  Box,
  List,
  ListItem,
  HStack,
  ListIcon,
  useToast,
} from "@chakra-ui/react";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import * as mutations from "../../graphql/mutations";

// React Icon imports
import { IoRemoveCircle } from "react-icons/io5";
import { FaRegUser, FaUser } from "react-icons/fa6";
import {
  GiMonsterGrasp,
  GiBorderedShield,
  GiBatteredAxe,
} from "react-icons/gi";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { IconType } from "react-icons";

// Custom imports
import Entity from "../../data/entity/Entity";
import EntitySelector from "../entities/EntitySelector";
import SceneMapEntities from "../../data/compositions/SceneMapEntities";

interface Props {
  handleFormClose: () => void;
  editScene: SceneMapEntities;
  email: string;
}

const SceneEditForm = ({ handleFormClose, editScene, email }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: editScene
      ? {
          name: editScene.name,
          description: editScene.description,
          entities: "",
        }
      : undefined,
  });

  useEffect(() => {
    var entities: Entity[] = [];
    editScene.entities?.forEach((entity) => {
      entities.push(entity!);
    });
    setSelectedEntities(entities);
  }, []);

  const [selectedEntities, setSelectedEntities] = useState<Entity[]>([]);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const toast = useToast();

  const [updatedSceneData, setUpdatedSceneData] = useState({
    id: editScene.id,
    name: editScene.name,
    description: editScene.description,
    entityIds: editScene.entityIds,
  });

  const handleUpdateScene = async () => {
    const { id, name, description } = updatedSceneData;

    const entityIdArray: string[] = [];

    selectedEntities.map((entity) => {
      entityIdArray.push(entity.id);
    });

    const sceneDetails = {
      id,
      name,
      description,
      entityIds: entityIdArray,
    };

    const graphqlClient = generateClient();
    graphqlClient
      .graphql({
        query: mutations.updateScene,
        variables: { input: sceneDetails },
      })
      .then(() => {
        handleFormClose();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const onEntitySelected = (selectedEntity: Entity) => {
    if (selectedEntities.includes(selectedEntity)) {
      console.log("This entity is already selected.");
      toast({
        title: "The entity '" + selectedEntity.name + "'is already selected.",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    } else {
      setSelectedEntities([...selectedEntities, selectedEntity]);
    }
  };

  const getTextForNoOfSelectedEntities = (): string => {
    const result = selectedEntities.length.toString();
    if (selectedEntities.length == 0) {
      setValue("entities", "");
    } else {
      setValue("entities", result);
    }
    return result;
  };

  const removeSelectedEntity = (entityToRemove: Entity) => {
    setSelectedEntities(
      selectedEntities.filter((entity) => entity.id !== entityToRemove.id)
    );
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
    <VStack>
      <Container>
        <form
          onSubmit={handleSubmit(() => {
            setIsFormSubmitting(true);
            handleUpdateScene();
          })}
        >
          <FormControl isInvalid={errors.name ? true : undefined}>
            <FormLabel paddingTop="10px" htmlFor="name">
              Name
            </FormLabel>
            <Input
              {...register("name", {
                required: "Please enter a scene name",
              })}
              id="name"
              disabled={isFormSubmitting}
              placeholder="Name of the Scene"
              onChange={(event) =>
                setUpdatedSceneData({
                  ...updatedSceneData,
                  name: event.target.value,
                })
              }
            />
            <FormErrorMessage>{`${errors.name?.message}`}</FormErrorMessage>
          </FormControl>
          <FormControl mb={3} isInvalid={errors.description ? true : undefined}>
            <FormLabel paddingTop="10px" htmlFor="description">
              Description
            </FormLabel>
            <Textarea
              {...register("description", {
                required: "Please enter a scene description",
              })}
              id="description"
              minH={150}
              placeholder="A short description of the Scene"
              disabled={isFormSubmitting}
              onChange={(event) =>
                setUpdatedSceneData({
                  ...updatedSceneData,
                  description: event.target.value,
                })
              }
            />
            <FormErrorMessage>{`${errors.description?.message}`}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.entities ? true : undefined}>
            <FormLabel paddingTop="10px" htmlFor="entities">
              Entities
            </FormLabel>
            <Text fontSize="xs" mb={2}>
              Number Selected Entities: {getTextForNoOfSelectedEntities()}
            </Text>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              hidden={selectedEntities.length == 0}
              mb={2}
            >
              <List spacing={3} padding={3}>
                {selectedEntities.map((entity) => (
                  <ListItem key={entity.id}>
                    <HStack justifyContent="space-between">
                      <HStack>
                        <ListIcon
                          as={getEntityIcon(entity.category!)}
                          color="gray.500"
                        />
                        <Text>{entity.name}</Text>
                      </HStack>
                      <Button
                        rightIcon={<IoRemoveCircle />}
                        colorScheme="red"
                        size="xs"
                        onClick={() => removeSelectedEntity(entity)}
                        isDisabled={isFormSubmitting}
                      >
                        Remove
                      </Button>
                    </HStack>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Input
              display="none"
              mb={2}
              {...register("entities", {
                required: "Please select one or more entities",
              })}
              id="entities"
              readOnly={true}
              disabled={isFormSubmitting}
              placeholder="Please select one or more entities"
            />

            <EntitySelector
              email={email}
              handleSelectedEntity={onEntitySelected}
              isInvalid={errors.entities ? true : undefined}
            />
            <FormErrorMessage>{`${errors.entities?.message}`}</FormErrorMessage>
          </FormControl>

          <Center>
            <Button
              mt={4}
              colorScheme="blue"
              type="submit"
              loadingText="Updating Scene..."
              isLoading={isFormSubmitting}
            >
              Update Scene
            </Button>
          </Center>
          <Divider mt={5} />
          <Center>
            <Text mt={1} fontSize="xs">
              Updating the map and the assignemnt to the adventure is currently
              unsupported.
            </Text>
          </Center>
        </form>
      </Container>
    </VStack>
  );
};

export default SceneEditForm;
