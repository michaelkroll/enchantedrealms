// React imports
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAddPhotoAlternate } from "react-icons/md";

// Chakra UI imports
import {
  FormLabel,
  FormControl,
  Input,
  Image,
  Button,
  Textarea,
  VStack,
  HStack,
  Text,
  FormErrorMessage,
  Container,
  Center,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import * as mutations from "../../graphql/mutations";

// Storage / S3
import { remove, uploadData } from "aws-amplify/storage";

import {
  FileUpload,
  FileUploadTrigger,
  FileUploadPreview,
} from "@saas-ui/file-upload";

import { v4 as uuid } from "uuid";

// Custom imports
import Adventure from "../../data/Adventure";

interface Props {
  handleFormClose: () => void;
  editAdventure: Adventure;
}

const AdventureEditForm = ({ handleFormClose, editAdventure }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: editAdventure
      ? {
          name: editAdventure.name,
          description: editAdventure.description,
          newAdventurePic: "",
        }
      : undefined,
  });

  const [newAdventurePic, setNewAdventurePic] = useState<File>();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const pictureBorderColor = useColorModeValue("gray.200", "gray.600");

  let adventurePicPath: string = "";

  const [updatedAdventureData, setUpdatedAdventureData] = useState({
    id: editAdventure.id,
    name: editAdventure.name,
    description: editAdventure.description,
    adventurePicPath: editAdventure.adventurePicPath,
  });

  const handleUpdateAdventure = async () => {
    const { id, name, description } = updatedAdventureData;
    console.log("New Adventure Pic: ", newAdventurePic);
    console.log("Old Adventure Pic: ", editAdventure.adventurePicPath);

    if (newAdventurePic) {
      try {
        await remove({
          path: editAdventure.adventurePicPath!,
        });
      } catch (error) {
        console.log(
          "Error removing old adventure picture: " +
            editAdventure.adventurePicPath! +
            "', error: " +
            error
        );
      }

      try {
        const result = await uploadData({
          path: `public/adventures/${uuid()}.png`,
          data: newAdventurePic!,
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
        id,
        name,
        description,
        adventurePicPath,
      };

      const graphqlClient = generateClient();
      graphqlClient
        .graphql({
          query: mutations.updateAdventure,
          variables: { input: adventureDetails },
        })
        .then(() => {
          handleFormClose();
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    } else {
      const adventureDetails = {
        id,
        name,
        description,
      };

      const graphqlClient = generateClient();
      graphqlClient
        .graphql({
          query: mutations.updateAdventure,
          variables: { input: adventureDetails },
        })
        .then(() => {
          handleFormClose();
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  };

  return (
    <VStack>
      <Container>
        <Text mt={2}>Adventure Image</Text>
        <Box mt={2} borderWidth="1px" borderRadius="lg" padding={3}>
          <Center>
            <Image src={editAdventure.adventurePicS3Url!} maxW={400} />
          </Center>
        </Box>

        <form
          onSubmit={handleSubmit(() => {
            setIsFormSubmitting(true);
            handleUpdateAdventure();
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
                setUpdatedAdventureData({
                  ...updatedAdventureData,
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
                required: "Please enter an adventure description",
              })}
              id="description"
              minH={150}
              placeholder="A short description of the adventure"
              disabled={isFormSubmitting}
              onChange={(event) =>
                setUpdatedAdventureData({
                  ...updatedAdventureData,
                  description: event.target.value,
                })
              }
            />
            <FormErrorMessage>{`${errors.description?.message}`}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel paddingTop="10px" htmlFor="newCoverImage">
              New Cover Image
            </FormLabel>
            <FileUpload
              id="newCoverImage"
              maxFileSize={1024 * 1024}
              maxFiles={1}
              onFilesChange={(files) => {
                setNewAdventurePic(files.acceptedFiles[0]);
              }}
              accept="image/*"
            >
              {({ files, deleteFile }) => (
                <Container
                  padding="15px"
                  border="1px"
                  borderWidth={1}
                  borderColor={pictureBorderColor}
                  borderRadius="5"
                >
                  <Center>
                    <Text fontSize="sm" paddingBottom="10px">
                      Please select a new image with an aspect ration of 4:3 if
                      you want to replace the current Adventure image. The
                      current image will be deleted.
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
          </FormControl>
          <Center>
            <Button
              mt={4}
              colorScheme="blue"
              type="submit"
              loadingText="Updating Adventure..."
              isLoading={isFormSubmitting}
            >
              Update Adventure
            </Button>
          </Center>
        </form>
      </Container>
    </VStack>
  );
};

export default AdventureEditForm;
