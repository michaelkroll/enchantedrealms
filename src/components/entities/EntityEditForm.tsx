// React imports
import { useState } from "react";

// React Hook Form imports
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
  Textarea,
  Text,
  Divider,
} from "@chakra-ui/react";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import * as mutations from "../../graphql/mutations";

// Custom imports
import entityCategories from "../../data/entity/EntityCategories";
import Entity from "../../data/entity/Entity";

interface Props {
  handleFormClose: () => void;
  entity: Entity;
}

const EntityEditForm = ({ handleFormClose, entity }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: entity
      ? {
          name: entity.name,
          description: entity.description,
          notes: entity.notes,
          category: entity.category,
          tokenId: entity.tokenId,
        }
      : undefined,
  });

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const [updatedEntityData, setUpdatedEntityData] = useState({
    id: entity.id,
    name: entity.name,
    description: entity.description,
    notes: entity.notes,
    category: entity.category,
  });

  const handleUpdateEntity = async () => {
    const { id, name, description, notes, category } = updatedEntityData;

    const entityUpdateDetails = {
      id,
      name,
      description,
      notes,
      category,
    };

    const graphqlClient = generateClient();

    graphqlClient
      .graphql({
        query: mutations.updateEntity,
        variables: { input: entityUpdateDetails },
      })
      .then(() => {
        handleFormClose();
      })
      .catch((error) => {
        console.log("Update Entity Error: ", error);
      });
  };

  return (
    <VStack>
      <Container marginBottom={10}>
        <form
          onSubmit={handleSubmit(() => {
            setIsFormSubmitting(true);
            handleUpdateEntity();
          })}
        >
          <FormControl isInvalid={errors.name ? true : undefined}>
            <FormLabel paddingTop="10px" htmlFor="name">
              Name
            </FormLabel>
            <Input
              {...register("name", {
                required: "Please enter a name for the entity",
              })}
              id="name"
              disabled={isFormSubmitting}
              placeholder="Name of the entity"
              onChange={(event) =>
                setUpdatedEntityData({
                  ...updatedEntityData,
                  name: event.target.value,
                })
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
                required: "Please enter an entity description",
              })}
              id="description"
              placeholder="A short description of the entity"
              disabled={isFormSubmitting}
              onChange={(event) =>
                setUpdatedEntityData({
                  ...updatedEntityData,
                  description: event.target.value,
                })
              }
            />
            <FormErrorMessage>{`${errors.description?.message}`}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel paddingTop="10px" htmlFor="notes">
              Notes
            </FormLabel>
            <Textarea
              {...register("notes", {})}
              id="notes"
              placeholder="Entity notes"
              disabled={isFormSubmitting}
              onChange={(event) =>
                setUpdatedEntityData({
                  ...updatedEntityData,
                  notes: event.target.value,
                })
              }
            />
          </FormControl>

          <FormControl isInvalid={errors.category ? true : undefined}>
            <FormLabel paddingTop="10px" htmlFor="category">
              Entity Category
            </FormLabel>
            <Stack spacing={3}>
              <Select
                {...register("category", {
                  required: "Please enter a category for the entity",
                })}
                variant="outline"
                placeholder="Select a category for the entity"
                id="category"
                disabled={isFormSubmitting}
                onChange={(event) =>
                  setUpdatedEntityData({
                    ...updatedEntityData,
                    category: event.target.value,
                  })
                }
              >
                {entityCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Select>
            </Stack>
            <FormErrorMessage>{`${errors.category?.message}`}</FormErrorMessage>
          </FormControl>

          <Center>
            <Button
              mt={4}
              colorScheme="blue"
              type="submit"
              loadingText="Updating Entity..."
              isLoading={isFormSubmitting}
            >
              Update Entity
            </Button>
          </Center>
          <Divider mt={5} />
          <Center>
            <Text mt={1} fontSize="xs">
              Updating the token for an entity is currently unsupported.
            </Text>
          </Center>
        </form>
      </Container>
    </VStack>
  );
};

export default EntityEditForm;
