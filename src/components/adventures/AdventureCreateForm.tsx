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
  Textarea,
  VStack,
  HStack,
  Text,
  FormErrorMessage,
  Container,
  Center,
  useColorModeValue,
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

interface Props {
  handleFormClose: () => void;
  email: string;
  sub: string;
}

const AdventureCreateForm = ({ handleFormClose, email, sub }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [adventurePic, setAdventurePic] = useState<File>();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const pictureBorderColor = useColorModeValue("gray.200", "gray.600");
  const pictureBorderColorError = useColorModeValue("red.500", "red.300");

  let adventurePicPath: string = "";

  // States used to create a new Adventure
  const [adventureData, setAdventureData] = useState({
    owner: "",
    ownerId: "",
    name: "",
    description: "",
    players: "",
  });

  const handleCreateAdventure = async () => {
    const { name, description } = adventureData;

    try {
      const result = await uploadData({
        path: `public/adventures/${uuid()}.png`,
        data: adventurePic!,
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
      adventurePicPath = result.path;
    } catch (error) {
      console.log("Error: ", error);
    }

    const adventureDetails = {
      id: uuid(),
      creatorEmail: email,
      creatorId: sub,
      name,
      description,
      adventurePicPath,
    };

    const graphqlClient = generateClient();
    graphqlClient
      .graphql({
        query: mutations.createAdventure,
        variables: { input: adventureDetails },
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
            handleCreateAdventure();
          })}
        >
          <FormControl isInvalid={errors.name ? true : undefined}>
            <FormLabel paddingTop="10px" htmlFor="name">
              Name
            </FormLabel>
            <Input
              {...register("name", {
                required: "Please enter an adventure name",
              })}
              id="name"
              disabled={isFormSubmitting}
              placeholder="Name of the Adventure"
              onChange={(event) =>
                setAdventureData({ ...adventureData, name: event.target.value })
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
                required: "Please enter an adventure description",
              })}
              id="description"
              placeholder="A short description of the adventure"
              disabled={isFormSubmitting}
              onChange={(event) =>
                setAdventureData({
                  ...adventureData,
                  description: event.target.value,
                })
              }
            />
            <FormErrorMessage>{`${errors.description?.message}`}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.picture ? true : undefined}>
            <FormLabel paddingTop="10px" htmlFor="picture">
              Cover Image
            </FormLabel>
            <FileUpload
              {...register("picture", {
                required: "Please select an adventure cover image",
              })}
              id="picture"
              maxFileSize={1024 * 1024}
              maxFiles={1}
              onFilesChange={(files) => {
                setAdventurePic(files.acceptedFiles[0]);
              }}
              accept="image/*"
            >
              {({ files, deleteFile }) => (
                <Container
                  padding="15px"
                  border="1px"
                  borderWidth={errors.picture ? 2 : 1}
                  borderColor={
                    errors.picture
                      ? pictureBorderColorError
                      : pictureBorderColor
                  }
                  borderRadius="5"
                >
                  <Center>
                    <Text paddingBottom="10px">
                      Please upload an image with an aspect ration of 4:3
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
            <FormErrorMessage>{`${errors.picture?.message}`}</FormErrorMessage>
          </FormControl>
          <Center>
            <Button
              mt={4}
              colorScheme="blue"
              type="submit"
              loadingText="Creating Adventure"
              isLoading={isFormSubmitting}
            >
              Create Adventure
            </Button>
          </Center>
        </form>
      </Container>
    </VStack>
  );
};

export default AdventureCreateForm;
