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
} from "@chakra-ui/react";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import * as mutations from "../../graphql/mutations";

// Custom imports
import { v4 as uuid } from "uuid";
import entityCategories from "../../data/EntityCategories";
import TokenSelector from "../tokens/TokenSelector";
import Token from "../../data/Token";

interface Props {
  handleFormClose: () => void;
  email: string;
  sub: string;
}

const EntityCreateForm = ({ handleFormClose, email, sub }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  // States used to create a new Token
  const [entityData, setEntityData] = useState({
    name: "",
    creatorEmail: "",
    creatorId: "",
    category: "",
    description: "",
    tokenId: "",
    tokenPicPath: "",
    tokenPicS3Url: "",
  });

  const handleCreateEntity = async () => {
    const {
      name,
      description,
      category,
      tokenId,
      tokenPicPath,
      tokenPicS3Url,
    } = entityData;

    const entityDetails = {
      id: uuid(),
      creatorEmail: email,
      creatorId: sub,
      name,
      description,
      category,
      tokenId,
      tokenPicPath,
      tokenPicS3Url,
    };

    const graphqlClient = generateClient();

    graphqlClient
      .graphql({
        query: mutations.createEntity,
        variables: { input: entityDetails },
      })
      .then(() => {
        handleFormClose();
      })
      .catch((error) => {
        console.log("Create Entity Error: ", error);
      });
  };

  const onTokenSelected = (selectedToken: Token | null) => {
    if (selectedToken) {
      setEntityData({
        ...entityData,
        tokenId: selectedToken.id,
        tokenPicPath: selectedToken.tokenPicPath!,
      });
      setValue("tokenName", selectedToken.name);
    } else {
      setEntityData({
        ...entityData,
        tokenId: "",
        tokenPicPath: "",
      });
      setValue("tokenName", "");
    }
  };

  return (
    <VStack>
      <Container marginBottom={10}>
        <form
          onSubmit={handleSubmit(() => {
            setIsFormSubmitting(true);
            handleCreateEntity();
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
                setEntityData({ ...entityData, name: event.target.value })
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
                setEntityData({
                  ...entityData,
                  description: event.target.value,
                })
              }
            />
            <FormErrorMessage>{`${errors.description?.message}`}</FormErrorMessage>
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
                  setEntityData({
                    ...entityData,
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

          <FormControl
            paddingBottom={3}
            isInvalid={errors.tokenName ? true : undefined}
          >
            <FormLabel paddingTop="10px" htmlFor="tokenName">
              Token
            </FormLabel>
            <Input
              readOnly={true}
              mb={2}
              {...register("tokenName", {
                required: "Please select a token",
              })}
              id="tokenName"
              disabled={isFormSubmitting}
              placeholder="Please select a token"
            />
            <TokenSelector
              email={email}
              handleSelectedToken={onTokenSelected}
            />
            <FormErrorMessage>{`${errors.tokenName?.message}`}</FormErrorMessage>
          </FormControl>

          <Center>
            <Button
              mt={4}
              colorScheme="blue"
              type="submit"
              loadingText="Creating Entity"
              isLoading={isFormSubmitting}
            >
              Create Entity
            </Button>
          </Center>
        </form>
      </Container>
    </VStack>
  );
};

export default EntityCreateForm;
