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
  Divider,
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
import mapCategories from "../../data/MapCategories";

interface Props {
  handleFormClose: () => void;
  email: string;
  sub: string;
}

const MapCreateForm = ({ handleFormClose, email, sub }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [mapPic, setMapPic] = useState<File>();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const pictureBorderColor = useColorModeValue("gray.200", "gray.600");
  const pictureBorderColorError = useColorModeValue("red.500", "red.300");

  let mapPicPath: string = "";

  // States used to create a new Map
  const [mapData, setMapData] = useState({
    owner: "",
    ownerId: "",
    name: "",
    category: "",
    gridded: false,
    shared: false,
    description: "",
  });

  const handleCreateMap = async () => {
    const { name, category, gridded, shared } = mapData;

    try {
      const result = await uploadData({
        path: `public/maps/${uuid()}.png`,
        data: mapPic!,
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
      mapPicPath = result.path;
    } catch (error) {
      console.log("Error: ", error);
    }

    const mapDetails = {
      id: uuid(),
      creatorEmail: email,
      creatorId: sub,
      name,
      category,
      shared,
      gridded,
      mapPicPath,
    };

    const graphqlClient = generateClient();
    graphqlClient
      .graphql({
        query: mutations.createMap,
        variables: { input: mapDetails },
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
            handleCreateMap();
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
              placeholder="Name of the map"
              onChange={(event) =>
                setMapData({ ...mapData, name: event.target.value })
              }
            />
            <FormErrorMessage>{`${errors.name?.message}`}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.category ? true : undefined}>
            <FormLabel paddingTop="10px" htmlFor="category">
              Map Category
            </FormLabel>
            <Stack spacing={3}>
              <Select
                {...register("category", {
                  required: "Please enter a category for the map",
                })}
                variant="outline"
                placeholder="Select a category"
                id="category"
                disabled={isFormSubmitting}
                onChange={(event) =>
                  setMapData({ ...mapData, category: event.target.value })
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
              <FormLabel paddingTop="10px" htmlFor="sharedWithOthers">
                Shared with others?
              </FormLabel>
              <Switch
                id="sharedWithOthers"
                disabled={isFormSubmitting}
                onChange={(event) =>
                  setMapData({
                    ...mapData,
                    shared: event.target.checked,
                  })
                }
              />
            </HStack>
          </FormControl>
          <Divider />
          <FormControl>
            <HStack justifyContent={"space-between"}>
              <FormLabel paddingTop="10px" htmlFor="isGridded">
                Has already a grid?
              </FormLabel>
              <Switch
                id="isGridded"
                disabled={isFormSubmitting}
                onChange={(event) =>
                  setMapData({
                    ...mapData,
                    gridded: event.target.checked,
                  })
                }
              />
            </HStack>
          </FormControl>
          <Divider />
          <FormControl isInvalid={errors.map ? true : undefined}>
            <FormLabel paddingTop="10px" htmlFor="map">
              Map Image
            </FormLabel>
            <FileUpload
              {...register("map", {
                required: "Please select an Map image",
              })}
              id="map"
              maxFileSize={10 * 1024 * 1024}
              maxFiles={1}
              onFilesChange={(files) => {
                setMapPic(files.acceptedFiles[0]);
              }}
              accept="image/*"
            >
              {({ files, deleteFile }) => (
                <Container
                  padding="15px"
                  border="1px"
                  borderWidth={errors.picture ? 2 : 1}
                  borderColor={
                    errors.map ? pictureBorderColorError : pictureBorderColor
                  }
                  borderRadius="5"
                >
                  <Center>
                    <Text paddingBottom="10px">Please upload a map image</Text>
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
            <FormErrorMessage>{`${errors.map?.message}`}</FormErrorMessage>
          </FormControl>
          <Center>
            <Button
              mt={4}
              colorScheme="blue"
              type="submit"
              loadingText="Creating Map"
              isLoading={isFormSubmitting}
            >
              Create Map
            </Button>
          </Center>
        </form>
      </Container>
    </VStack>
  );
};

export default MapCreateForm;
