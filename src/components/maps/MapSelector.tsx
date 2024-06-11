// React imports
import { useEffect, useState } from "react";

// Chakra UI imports
import {
  Box,
  Card,
  CardBody,
  HStack,
  Icon,
  Image,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// React Icon imports
import { TbGrid4X4 } from "react-icons/tb";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import { listMaps } from "../../graphql/queries";

// Storage S3
import { getUrl } from "aws-amplify/storage";

// Custom imports
import Map from "../../data/Map";
import mapCategories from "../../data/MapCategories";

interface Props {
  email: string;
  handleSelectedMap: (selectedMap: Map | null) => void;
  isInvalid: boolean | undefined;
}

const MapSelector = ({ email, handleSelectedMap, isInvalid }: Props) => {
  const mapCardColor = useColorModeValue("gray.200", "gray.600");
  const mapCardSelectedColor = useColorModeValue("blue.200", "blue.600");

  const [isMapSelected, setIsMapSelected] = useState(false);
  const [maps, setMaps] = useState<Map[]>([]);
  const [selectedMapCategory, setSelectedMapCategory] = useState(
    "Please Select a Map Category"
  );

  useEffect(() => {
    if (selectedMapCategory !== "Please Select a Map Category") {
      handleListMaps();
    }
  }, [selectedMapCategory]);

  const handleListMaps = async () => {
    const graphqlClient = generateClient();

    let cat = mapCategories.find((category) =>
      category.label === selectedMapCategory ? category : null
    );

    const listMapVariables = {
      filter: {
        and: [
          {
            or: [
              {
                creatorEmail: {
                  eq: email,
                },
              },
              {
                shared: {
                  eq: true,
                },
              },
            ],
          },
          {
            category: {
              eq: cat!.value,
            },
          },
        ],
      },
    };

    graphqlClient
      .graphql({
        query: listMaps,
        variables: listMapVariables,
      })
      .then((response) => {
        const mapList = response.data.listMaps.items;
        mapList.map(async (map) => {
          const mapPicPath = map.mapPicPath;
          const getUrlResult = await getUrl({
            path: mapPicPath!,
            options: {
              expiresIn: 900,
            },
          });

          const mapImage = getUrlResult.url.toString();
          map.mapPicS3Url = mapImage;
        });

        mapList.sort((a, b) => a.name.localeCompare(b.name));

        setMaps(mapList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMapSelection = (selectedMap: Map) => {
    setMaps(
      maps.map((map) =>
        map.id != selectedMap.id ? { ...map, selected: false } : map
      )
    );
    handleSelectedMap(selectedMap.selected ? selectedMap : null);
    setIsMapSelected(selectedMap.selected!);
  };

  const displaySelectMapText = (): string => {
    if (isMapSelected) {
      return "none";
    } else if (maps.length == 0) {
      return "none";
    } else {
      return "block";
    }
  };

  const getBorderColor = (): string => {
    if (isInvalid) {
      return "red.300";
    }
    return "gray.600";
  };

  return (
    <Box
      border={isInvalid ? "2px" : "1px"}
      borderRadius="lg"
      padding={3}
      borderColor={getBorderColor()}
    >
      <HStack>
        <Select
          onChange={(event) => {
            setSelectedMapCategory(event.target.value);
          }}
        >
          <option key={0} value={"Please Select a Map Category"}>
            Please Select a Map Category
          </option>
          {mapCategories.map((category) => (
            <option key={category.value} value={category.label}>
              {category.label}
            </option>
          ))}
          ;
        </Select>
      </HStack>
      {maps.length == 0 &&
      selectedMapCategory != "Please Select a Map Category" ? (
        <Text mt={2}>There are no maps available in this category</Text>
      ) : (
        ""
      )}
      <Text mb={0} mt={2} fontSize="md" display={displaySelectMapText()}>
        Please select a Map from the list
      </Text>

      <SimpleGrid columns={3} spacing={1} paddingTop={maps.length == 0 ? 0 : 2}>
        {maps.map((map) => (
          <Card
            variant="outline"
            key={map.id}
            backgroundColor={map.selected ? mapCardSelectedColor : mapCardColor}
            onClick={() => {
              if (map.selected != null) {
                map.selected = !map.selected;
              } else {
                map.selected = true;
              }
              handleMapSelection(map);
            }}
          >
            <CardBody padding={1}>
              <Stack>
                <Icon
                  position="absolute"
                  top="10px"
                  right="10px"
                  as={TbGrid4X4}
                  display={map.gridded ? "flex" : "none"}
                />
                <Image src={map.mapPicS3Url!} borderTopRadius={4}></Image>
                <Box ml={1}>
                  <Text fontSize="xs">{map.name}</Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MapSelector;
