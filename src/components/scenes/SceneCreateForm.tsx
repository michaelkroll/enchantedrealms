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
} from "@chakra-ui/react";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import * as mutations from "../../graphql/mutations";

// Custom imports
import { v4 as uuid } from "uuid";

import AdventureSelector from "../adventures/AdventureSelector";
import Adventure from "../../data/Adventure";

import MapSelector from "../maps/MapSelector";
import Map from "../../data/Map";

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

    const sceneDetails = {
      id: uuid(),
      creatorEmail: email,
      creatorId: sub,
      name,
      description,
      adventureId: adventureId,
      mapId: mapId,
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

  return (
    <VStack>
      <Container>
        <form
          onSubmit={handleSubmit(() => {
            setIsFormSubmitting(true);
            handleCreateScene();
          })}
        >
          <FormControl isInvalid={errors.adventure ? true : undefined}>
            <FormLabel paddingTop="10px" htmlFor="adventure">
              Adventure
            </FormLabel>
            <Input
              readOnly={true}
              mb={2}
              {...register("adventure", {
                required: "Please select an adventure",
              })}
              id="adventure"
              disabled={isFormSubmitting}
              placeholder="Please select an adcenture"
              //value={selectedAdventureName}
            />
            <AdventureSelector
              email={email}
              handleSelectedAdventure={onAdventureSelected}
            />
            <FormErrorMessage>{`${errors.adventure?.message}`}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.map ? true : undefined}>
            <FormLabel paddingTop="10px" htmlFor="map">
              Map
            </FormLabel>
            <Input
              mb={2}
              {...register("map", {
                required: "Please select a map",
              })}
              id="map"
              readOnly={true}
              disabled={isFormSubmitting}
              placeholder="Please select a map"
            />

            <MapSelector email={email} handleSelectedMap={onMapSelected} />
            <FormErrorMessage>{`${errors.map?.message}`}</FormErrorMessage>
          </FormControl>

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
          <FormControl mb={3} isInvalid={errors.description ? true : undefined}>
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
