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
import Scene from "../../data/Scene";
// import Map from "../../data/Map";
// import MapSelector from "../maps/MapSelector";
// import AdventureSelector from "../adventures/AdventureSelector";
// import Adventure from "../../data/Adventure";

interface Props {
  handleFormClose: () => void;
  editScene: Scene;
}

const SceneEditForm = ({ handleFormClose, editScene }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: editScene
      ? {
          name: editScene.name,
          description: editScene.description,
        }
      : undefined,
  });

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const [updatedSceneData, setUpdatedSceneData] = useState({
    id: editScene.id,
    name: editScene.name,
    description: editScene.description,
  });

  const handleUpdateScene = async () => {
    const { id, name, description } = updatedSceneData;

    const sceneDetails = {
      id,
      name,
      description,
    };

    console.log(sceneDetails);

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

  // const onAdventureSelected = (adventure: Adventure | null) => {
  //   console.log("Adventure Selected for the scene: ", adventure);
  // };

  return (
    <VStack>
      <Container>
        <form
          onSubmit={handleSubmit(() => {
            setIsFormSubmitting(true);
            handleUpdateScene();
          })}
        >
          {/* <FormControl>
            <FormLabel paddingTop="10px" htmlFor="adventure">
              Adventure
            </FormLabel>
            <AdventureSelector
              email={email}
              handleSelectedAdventure={onAdventureSelected}
            />
          </FormControl> */}

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
        </form>
      </Container>
    </VStack>
  );
};

export default SceneEditForm;
