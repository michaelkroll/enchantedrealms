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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
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
          gridOffsetX: map.gridOffsetX,
          gridOffsetY: map.gridOffsetY,
          gridColumns: map.gridColumns,
          gridRows: map.gridRows,
          gridCellWidth: map.gridCellWidth,
          gridCellHeight: map.gridCellHeight
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
    gridOffsetX: map.gridOffsetX,
    gridOffsetY: map.gridOffsetY,
    gridColumns: map.gridColumns,
    gridRows: map.gridRows,
    gridCellWidth: map.gridCellWidth,
    gridCellHeight: map.gridCellHeight
  });

  const handleUpdateMap = async () => {
    const {
      id,
      name,
      category,
      shared,
      gridded,
      gridOffsetX,
      gridOffsetY,
      gridColumns,
      gridRows,
      gridCellWidth,
      gridCellHeight
    } = updatedMapData;
    const mapUpdateDetails = {
      id,
      name,
      category,
      shared,
      gridded,
      gridOffsetX,
      gridOffsetY,
      gridColumns,
      gridRows,
      gridCellWidth,
      gridCellHeight
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
          <Divider />
          <FormControl>
            <HStack justifyContent={"space-between"}>
              <FormLabel paddingTop="10px" htmlFor="gridded">
                Has a grid printed on the Map?
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
          <Box display={updatedMapData.gridded ? "" : "none"}>
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
                    setUpdatedMapData({
                      ...updatedMapData,
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
                    setUpdatedMapData({
                      ...updatedMapData,
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
                    setUpdatedMapData({
                      ...updatedMapData,
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
                    setUpdatedMapData({
                      ...updatedMapData,
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
                    setUpdatedMapData({
                      ...updatedMapData,
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
                    setUpdatedMapData({
                      ...updatedMapData,
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
          </Box>
          <Divider mt={2} />
          <Center>
            <Button
              mt={4}
              colorScheme="blue"
              type="submit"
              loadingText="Updating Map..."
              isLoading={isFormSubmitting}
            >
              Update Map
            </Button>
          </Center>
          <Divider mt={4} />
          <Center>
            <Text mt={1} fontSize="xs">
              Updating the map image is currently unsupported.
            </Text>
          </Center>
        </form>
      </Container>
    </VStack>
  );
};

export default MapEditForm;
