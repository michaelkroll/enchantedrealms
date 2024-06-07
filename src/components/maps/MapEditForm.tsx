// React imports
import { useState } from "react";
import { useForm } from "react-hook-form";

// Chakra UI imports
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  VStack,
  FormErrorMessage,
  Container,
  Center,
  Stack,
  Select,
  Switch,
  Divider,
  Text,
  HStack,
} from "@chakra-ui/react";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import * as mutations from "../../graphql/mutations";

// Custom imports
import mapCategories from "../../data/MapCategories";
import Map from "../../data/Map";

interface Props {
  handleFormClose: () => void;
  map: Map;
}

const MapEditForm = ({ handleFormClose, map }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: map
      ? {
          name: map.name,
          category: map.category,
          shared: map.shared,
          gridded: map.gridded,
        }
      : undefined,
  });

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const [updatedMapData, setUpdatedMapData] = useState({
    id: map.id,
    name: map.name,
    category: map.category,
    shared: map.shared,
    gridded: map.gridded,
  });

  const handleUpdateMap = async () => {
    const { id, name, category, shared, gridded } = updatedMapData;
    const mapUpdateDetails = {
      id,
      name,
      category,
      shared,
      gridded,
    };

    const graphqlClient = generateClient();
    graphqlClient
      .graphql({
        query: mutations.updateMap,
        variables: { input: mapUpdateDetails },
      })
      .then(() => {
        handleFormClose();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <VStack>
      <Container>
        <form
          onSubmit={handleSubmit(() => {
            setIsFormSubmitting(true);
            handleUpdateMap();
          })}
        >
          <FormControl isInvalid={errors.name ? true : undefined}>
            <FormLabel paddingTop="10px" htmlFor="name">
              Name
            </FormLabel>
            <Input
              {...register("name", {
                required: "Please enter a name for the map",
              })}
              id="name"
              disabled={isFormSubmitting}
              placeholder="Name of the Map"
              onChange={(event) =>
                setUpdatedMapData({
                  ...updatedMapData,
                  name: event.target.value,
                })
              }
            />
            <FormErrorMessage>{`${errors.name?.message}`}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.category ? true : undefined}>
            <FormLabel paddingTop="10px" htmlFor="category">
              Category
            </FormLabel>
            <Stack spacing={3}>
              <Select
                {...register("category", {
                  required: "Please enter a category for the map",
                })}
                variant="outline"
                placeholder="Select a map category"
                id="category"
                disabled={isFormSubmitting}
                onChange={(event) =>
                  setUpdatedMapData({
                    ...updatedMapData,
                    category: event.target.value,
                  })
                }
              >
                {mapCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Select>
            </Stack>
            <FormErrorMessage>{`${errors.category?.message}`}</FormErrorMessage>
          </FormControl>
          <Divider paddingTop={3} />
          <FormControl>
            <HStack justifyContent={"space-between"}>
              <FormLabel paddingTop="10px" htmlFor="shared">
                Shared with others?
              </FormLabel>
              <Switch
                defaultChecked={map.shared!}
                id="shared"
                disabled={isFormSubmitting}
                onChange={(event) =>
                  setUpdatedMapData({
                    ...updatedMapData,
                    shared: event.target.checked,
                  })
                }
              />
            </HStack>
          </FormControl>
          <FormControl>
            <HStack justifyContent={"space-between"}>
              <FormLabel paddingTop="10px" htmlFor="gridded">
                Has already a grid?
              </FormLabel>
              <Switch
                defaultChecked={map.gridded!}
                id="gridded"
                disabled={isFormSubmitting}
                onChange={(event) =>
                  setUpdatedMapData({
                    ...updatedMapData,
                    gridded: event.target.checked,
                  })
                }
              />
            </HStack>
          </FormControl>
          <Divider />
          <Center>
            <Button
              mt={4}
              colorScheme="blue"
              type="submit"
              loadingText="Updating Map"
              isLoading={isFormSubmitting}
            >
              Update Token Values
            </Button>
          </Center>
          <Divider mt={5} />
          <Text mt={1} fontSize="xs">
            There is no need to change the image of a map. Renaming and changing
            the category and flags is supported. If the map with its originaly
            selected/uploaded image is no longer needed, just delete it.
          </Text>
        </form>
      </Container>
    </VStack>
  );
};

export default MapEditForm;
