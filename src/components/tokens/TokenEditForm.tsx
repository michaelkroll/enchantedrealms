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
} from "@chakra-ui/react";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import * as mutations from "../../graphql/mutations";

// Custom imports
import tokenCategories from "../../data/token/TokenCategories";
import Token from "../../data/token/Token";

interface Props {
  handleFormClose: () => void;
  token: Token;
}

const TokenEditForm = ({ handleFormClose, token }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: token
      ? {
          name: token.name,
          category: token.category,
          shared: token.shared,
        }
      : undefined,
  });

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const [updatedTokenData, setUpdatedTokenData] = useState({
    id: token.id,
    name: token.name,
    category: token.category,
    shared: token.shared,
  });

  const handleUpdateToken = async () => {
    const { id, name, category, shared } = updatedTokenData;
    const tokenUpdateDetails = {
      id,
      name,
      category,
      shared,
    };

    const graphqlClient = generateClient();
    graphqlClient
      .graphql({
        query: mutations.updateToken,
        variables: { input: tokenUpdateDetails },
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
            handleUpdateToken();
          })}
        >
          <FormControl isInvalid={errors.name ? true : undefined}>
            <FormLabel paddingTop="10px" htmlFor="name">
              Name
            </FormLabel>
            <Input
              {...register("name", {
                required: "Please enter a name for the token",
              })}
              id="name"
              disabled={isFormSubmitting}
              placeholder="Name of the token"
              onChange={(event) =>
                setUpdatedTokenData({
                  ...updatedTokenData,
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
                  required: "Please enter a category for the token",
                })}
                variant="outline"
                placeholder="Select a category"
                id="category"
                disabled={isFormSubmitting}
                onChange={(event) =>
                  setUpdatedTokenData({
                    ...updatedTokenData,
                    category: event.target.value,
                  })
                }
              >
                {tokenCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Select>
            </Stack>
            <FormErrorMessage>{`${errors.category?.message}`}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel paddingTop="10px" htmlFor="shared">
              Shared with others?
            </FormLabel>
            <Switch
              defaultChecked={token.shared!}
              id="shared"
              disabled={isFormSubmitting}
              onChange={(event) =>
                setUpdatedTokenData({
                  ...updatedTokenData,
                  shared: event.target.checked,
                })
              }
            />
          </FormControl>
          <Center>
            <Button
              mt={4}
              colorScheme="blue"
              type="submit"
              loadingText="Updating Token..."
              isLoading={isFormSubmitting}
            >
              Update Token
            </Button>
          </Center>
          <Divider mt={5} />
          <Center>
            <Text mt={1} fontSize="xs">
              Updating the token image is currently unsupported.
            </Text>
          </Center>
        </form>
      </Container>
    </VStack>
  );
};

export default TokenEditForm;
