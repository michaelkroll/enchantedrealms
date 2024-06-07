// React imports
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAddPhotoAlternate } from "react-icons/md";

// Chakra UI imports
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  VStack,
  HStack,
  Text,
  FormErrorMessage,
  Container,
  Center,
  useColorModeValue,
  Stack,
  Select,
  Switch,
} from "@chakra-ui/react";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import * as mutations from "../../graphql/mutations";

// Storage / S3
import { uploadData } from "aws-amplify/storage";

import {
  FileUpload,
  FileUploadTrigger,
  FileUploadPreview,
} from "@saas-ui/file-upload";

// Custom imports
import { v4 as uuid } from "uuid";
import tokenCategories from "../../data/TokenCategories";

interface Props {
  handleFormClose: () => void;
  email: string;
  sub: string;
}

const TokenCreateForm = ({ handleFormClose, email, sub }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [tokenPic, setTokenPic] = useState<File>();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const tokenPictureBorderColor = useColorModeValue("gray.200", "gray.600");
  const tokenPictureBorderColorError = useColorModeValue("red.500", "red.300");

  let tokenPicPath: string = "";

  // States used to create a new Token
  const [tokenData, setTokenData] = useState({
    owner: "",
    ownerId: "",
    name: "",
    category: "",
    shared: false,
    systemProvided: false,
  });

  const handleCreateToken = async () => {
    const { name, category, shared } = tokenData;

    try {
      const result = await uploadData({
        path: `public/tokens/${uuid()}.png`,
        data: tokenPic!,
        options: {
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              console.log(
                `Upload progress ${Math.round(
                  (transferredBytes / totalBytes) * 100
                )}%`
              );
            }
          },
        },
      }).result;
      console.log("Path from response: ", result.path);
      tokenPicPath = result.path;
    } catch (error) {
      console.log("Error: ", error);
    }

    const tokenDetails = {
      id: uuid(),
      creatorEmail: email,
      creatorId: sub,
      name,
      category,
      shared,
      systemProvided: false,
      tokenPicPath,
    };

    const graphqlClient = generateClient();
    graphqlClient
      .graphql({
        query: mutations.createToken,
        variables: { input: tokenDetails },
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
            handleCreateToken();
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
                setTokenData({ ...tokenData, name: event.target.value })
              }
            />
            <FormErrorMessage>{`${errors.name?.message}`}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.category ? true : undefined}>
            <FormLabel paddingTop="10px" htmlFor="category">
              Token Category
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
                  setTokenData({ ...tokenData, category: event.target.value })
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
            <FormLabel paddingTop="10px" htmlFor="sharedWithOthers">
              Shared with others?
            </FormLabel>
            <Switch
              id="sharedWithOthers"
              disabled={isFormSubmitting}
              onChange={(event) =>
                setTokenData({
                  ...tokenData,
                  shared: event.target.checked,
                })
              }
            />
          </FormControl>

          <FormControl isInvalid={errors.token ? true : undefined}>
            <FormLabel paddingTop="10px" htmlFor="token">
              Token Image
            </FormLabel>
            <FileUpload
              {...register("token", {
                required: "Please select an token image",
              })}
              id="token"
              maxFileSize={10 * 1024 * 1024}
              maxFiles={1}
              onFilesChange={(files) => {
                setTokenPic(files.acceptedFiles[0]);
              }}
              accept="image/*"
            >
              {({ files, deleteFile }) => (
                <Container
                  padding="15px"
                  border="1px"
                  borderWidth={errors.token ? 2 : 1}
                  borderColor={
                    errors.token
                      ? tokenPictureBorderColorError
                      : tokenPictureBorderColor
                  }
                  borderRadius="5"
                >
                  <Center>
                    <Text paddingBottom="10px">
                      Please upload a token image
                    </Text>
                  </Center>
                  <Center>
                    {!files?.length ? (
                      <FileUploadTrigger
                        as={Button}
                        leftIcon={<MdAddPhotoAlternate />}
                        disabled={isFormSubmitting}
                      >
                        Select Image File
                      </FileUploadTrigger>
                    ) : (
                      <HStack>
                        <FileUploadPreview file={files[0]} width="100px" />
                        <Text fontSize="sm">{files[0].name}</Text>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFile(files[0]);
                          }}
                        >
                          Clear
                        </Button>
                      </HStack>
                    )}
                  </Center>
                </Container>
              )}
            </FileUpload>
            <FormErrorMessage>{`${errors.token?.message}`}</FormErrorMessage>
          </FormControl>
          <Center>
            <Button
              mt={4}
              colorScheme="blue"
              type="submit"
              loadingText="Creating Token"
              isLoading={isFormSubmitting}
            >
              Create Token
            </Button>
          </Center>
        </form>
      </Container>
    </VStack>
  );
};

export default TokenCreateForm;
