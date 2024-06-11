// React imports
import { useState } from "react";
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
  ListItem,
  Text,
  List,
  HStack,
  ListIcon,
  Box,
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
import { v4 as uuid } from "uuid";

import AdventureSelector from "../adventures/AdventureSelector";
import Adventure from "../../data/Adventure";

import MapSelector from "../maps/MapSelector";
import Map from "../../data/Map";
import Entity from "../../data/Entity";
import EntitySelector from "../entities/EntitySelector";

interface Props {
  handleFormClose: () => void;
  email: string;
  sub: string;
}

const SceneCreateForm = ({ handleFormClose, email, sub }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [selectedEntities, setSelectedEntities] = useState<Entity[]>([]);

  // States used to create a new Scene
  const [sceneData, setSceneData] = useState({
    owner: "",
    ownerId: "",
    name: "",
    description: "",
    adventureId: "",
    mapId: "",
  });

  const handleCreateScene = async () => {
    const { name, description, adventureId, mapId } = sceneData;

    const entityIdArray: string[] = [];

    selectedEntities.map((entity) => {
      entityIdArray.push(entity.id);
    });

    const sceneDetails = {
      id: uuid(),
      creatorEmail: email,
      creatorId: sub,
      name,
      description,
      adventureId: adventureId,
      mapId: mapId,
      entityIds: entityIdArray,
    };

    const graphqlClient = generateClient();
    graphqlClient
      .graphql({
        query: mutations.createScene,
        variables: { input: sceneDetails },
      })
      .then(() => {
        handleFormClose();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const onAdventureSelected = (adventure: Adventure | null) => {
    if (adventure) {
      setSceneData({ ...sceneData, adventureId: adventure.id });
      setValue("adventure", adventure.name);
    } else {
      setSceneData({ ...sceneData, adventureId: "" });
      setValue("adventure", "");
    }
  };

  const onMapSelected = (map: Map | null) => {
    if (map) {
      setSceneData({ ...sceneData, mapId: map.id });
      setValue("map", map.name);
    } else {
      setSceneData({ ...sceneData, mapId: "" });
      setValue("map", "");
    }
  };

  const onEntitySelected = (selectedEntity: Entity) => {
    if (selectedEntity.selected) {
      setSelectedEntities([...selectedEntities, selectedEntity]);
    } else {
      setSelectedEntities(
        selectedEntities.filter((entity) => entity.id !== selectedEntity.id)
      );
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
            handleCreateScene();
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
                setSceneData({ ...sceneData, name: event.target.value })
              }
            />
            <FormErrorMessage>{`${errors.name?.message}`}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.description ? true : undefined}>
            <FormLabel paddingTop="10px" htmlFor="description">
              Description
            </FormLabel>
            <Textarea
              {...register("description", {
                required: "Please enter a scene description",
              })}
              id="description"
              placeholder="A short description of the scene"
              disabled={isFormSubmitting}
              onChange={(event) =>
                setSceneData({
                  ...sceneData,
                  description: event.target.value,
                })
              }
            />
            <FormErrorMessage>{`${errors.description?.message}`}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.adventure ? true : undefined}>
            <FormLabel paddingTop="10px" htmlFor="adventure">
              Adventure
            </FormLabel>
            <Input
              display="none"
              mb={2}
              {...register("adventure", {
                required: "Please select an adventure",
              })}
              id="adventure"
              disabled={isFormSubmitting}
              placeholder="Please select an adventure"
            />
            <AdventureSelector
              email={email}
              handleSelectedAdventure={onAdventureSelected}
              isInvalid={errors.adventure ? true : undefined}
            />
            <FormErrorMessage>{`${errors.adventure?.message}`}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.map ? true : undefined}>
            <FormLabel paddingTop="10px" htmlFor="map">
              Map
            </FormLabel>
            <Input
              display="none"
              mb={2}
              {...register("map", {
                required: "Please select a map",
              })}
              id="map"
              readOnly={true}
              disabled={isFormSubmitting}
              placeholder="Please select a map"
            />

            <MapSelector
              email={email}
              handleSelectedMap={onMapSelected}
              isInvalid={errors.map ? true : undefined}
            />
            <FormErrorMessage>{`${errors.map?.message}`}</FormErrorMessage>
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
              loadingText="Creating Scene"
              isLoading={isFormSubmitting}
            >
              Create Scene
            </Button>
          </Center>
        </form>
      </Container>
    </VStack>
  );
};

export default SceneCreateForm;
