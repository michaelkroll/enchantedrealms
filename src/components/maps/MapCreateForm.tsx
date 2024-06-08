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
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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
    drawGrid: false,
    gridHtmlColor: "",
    gridOffsetX: 0,
    gridOffsetY: 0,
    gridColumns: 0,
    gridRows: 0,
    gridCellWidth: 0,
    gridCellHeight: 0,
    shared: false,
    description: "",
  });

  const handleCreateMap = async () => {
    const {
      name,
      category,
      shared,
      gridded,
      drawGrid,
      gridHtmlColor,
      gridOffsetX,
      gridOffsetY,
      gridColumns,
      gridRows,
      gridCellWidth,
      gridCellHeight,
    } = mapData;

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
      drawGrid,
      gridHtmlColor,
      gridOffsetX,
      gridOffsetY,
      gridColumns,
      gridRows,
      gridCellWidth,
      gridCellHeight,
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
                Define Grid?
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
          <Box display={mapData.gridded ? "" : "none"}>
            <Divider mt={2} />
            <Text m={2} fontSize="sm">
              The Grid starts at the following coordinates on the map:
            </Text>
            <FormControl>
              <HStack justifyContent={"space-between"}>
                <FormLabel ml={5} paddingTop="10px" htmlFor="gridOffsetX">
                  x-Coordinate for the grid to start
                </FormLabel>
                <NumberInput
                  id="gridOffsetX"
                  defaultValue={0}
                  min={0}
                  maxW="100"
                  onChange={(event) => {
                    setMapData({
                      ...mapData,
                      gridOffsetX: parseInt(event),
                    });
                  }}
                >
                  <NumberInputField {...register("gridOffsetX", {})} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            </FormControl>
            <FormControl mt={2}>
              <HStack justifyContent={"space-between"}>
                <FormLabel ml={5} paddingTop="10px" htmlFor="gridOffsetY">
                  y-Coordinate for the grid to start
                </FormLabel>
                <NumberInput
                  id="gridOffsetY"
                  defaultValue={0}
                  min={0}
                  maxW="100"
                  onChange={(event) => {
                    setMapData({
                      ...mapData,
                      gridOffsetY: parseInt(event),
                    });
                  }}
                >
                  <NumberInputField {...register("gridOffsetY", {})} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            </FormControl>

            <FormControl mt={2}>
              <HStack justifyContent={"space-between"}>
                <FormLabel ml={5} paddingTop="10px" htmlFor="gridColumns">
                  Number of Grid Columns
                </FormLabel>
                <NumberInput
                  id="gridColumns"
                  defaultValue={0}
                  min={0}
                  maxW="100"
                  onChange={(event) => {
                    setMapData({
                      ...mapData,
                      gridColumns: parseInt(event),
                    });
                  }}
                >
                  <NumberInputField {...register("gridColumns", {})} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            </FormControl>

            <FormControl mt={2}>
              <HStack justifyContent={"space-between"}>
                <FormLabel ml={5} paddingTop="10px" htmlFor="gridRows">
                  Number of Grid Columns
                </FormLabel>
                <NumberInput
                  id="gridRows"
                  defaultValue={0}
                  min={0}
                  maxW="100"
                  onChange={(event) => {
                    setMapData({
                      ...mapData,
                      gridRows: parseInt(event),
                    });
                  }}
                >
                  <NumberInputField {...register("gridRows", {})} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            </FormControl>

            <FormControl mt={2}>
              <HStack justifyContent={"space-between"}>
                <FormLabel ml={5} paddingTop="10px" htmlFor="gridCellWidth">
                  Width of one cell in pixels
                </FormLabel>
                <NumberInput
                  id="gridCellWidth"
                  defaultValue={0}
                  min={0}
                  maxW="100"
                  onChange={(event) => {
                    setMapData({
                      ...mapData,
                      gridCellWidth: parseInt(event),
                    });
                  }}
                >
                  <NumberInputField {...register("gridCellWidth", {})} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            </FormControl>

            <FormControl mt={2}>
              <HStack justifyContent={"space-between"}>
                <FormLabel ml={5} paddingTop="10px" htmlFor="gridCellHeight">
                  Height of one cell in pixels
                </FormLabel>
                <NumberInput
                  id="gridCellHeight"
                  defaultValue={0}
                  min={0}
                  maxW="100"
                  onChange={(event) => {
                    setMapData({
                      ...mapData,
                      gridCellHeight: parseInt(event),
                    });
                  }}
                >
                  <NumberInputField {...register("gridCellHeight", {})} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            </FormControl>
            <FormControl>
              <HStack justifyContent={"space-between"}>
                <FormLabel ml={5} paddingTop="10px" htmlFor="drawGrid">
                  Do you want the grid to be rendered?
                </FormLabel>
                <Switch
                  id="drawGrid"
                  disabled={isFormSubmitting}
                  onChange={(event) =>
                    setMapData({
                      ...mapData,
                      drawGrid: event.target.checked,
                    })
                  }
                />
              </HStack>
            </FormControl>
            <FormControl display={mapData.drawGrid ? "" : "none"}>
              <HStack justifyContent={"space-between"}>
                <FormLabel ml={5} paddingTop="10px" htmlFor="gridHtmlColor">
                  Grid Color
                </FormLabel>
                <input
                  {...register("gridHtmlColor", {})}
                  type="color"
                  onChange={(event) => {
                    setMapData({
                      ...mapData,
                      gridHtmlColor: event.target.value,
                    });
                  }}
                />
              </HStack>
            </FormControl>
          </Box>
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
