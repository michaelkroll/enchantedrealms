// React imports
import { useState } from "react";

// Amplify imports
import { generateClient } from "aws-amplify/api";
import * as mutations from "../../graphql/mutations";

// React Icon imports
import {
  MdOutlineEditNote,
  MdOutlineDelete,
  MdOutlineShare,
} from "react-icons/md";

import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

import { TbGrid4X4 } from "react-icons/tb";

// ChakraUI imports
import {
  Card,
  CardBody,
  Heading,
  Image,
  Button,
  Text,
  CardFooter,
  Divider,
  Stack,
  ButtonGroup,
  Tooltip,
  Icon,
  Center,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";

// Custom imports
import MapDeleteConfirmationAlert from "./MapDeleteConfirmationAlert";
import Map from "../../data/Map";
import mapCategories from "../../data/MapCategories";
import MapDisplayModal from "./MapDisplayModal";

interface Props {
  map: Map;
  handleDeleteMap: (map: Map) => void;
  handleUpdateMap: (map: Map) => void;
  loggedInEmail: string;
}

const MapCard = ({
  map,
  loggedInEmail,
  handleDeleteMap,
  handleUpdateMap,
}: Props) => {
  const cardBorderColor = useColorModeValue("gray.300", "gray.600");
  const cardBackgroundColor = useColorModeValue("gray.50", "gray.700");

  const [isDeleteMapConfirmModalOpen, setDeleteMapConfirmModalOpen] =
    useState(false);

  const [isShowFullsizeMapModalOpen, setShowFullsizeMapModalOpen] =
    useState(false);

  const onDeleteMapAlertConfirmClose = () => {
    setDeleteMapConfirmModalOpen(false);
  };

  const onDeleteMapAlertConfirmCloseAfterDelete = () => {
    setDeleteMapConfirmModalOpen(false);
    handleDeleteMap(map);
  };

  const onFullSizeMapClose = () => {
    setShowFullsizeMapModalOpen(false);
  };

  const categoryLabel = (categoryValue: string): string | undefined => {
    return mapCategories.find((category) => category.value === categoryValue)
      ?.label;
  };

  const textForSharedLabel = (): string => {
    if (map.shared == true) {
      if (map.creatorEmail == loggedInEmail) {
        return "You are sharing this map";
      } else {
        return "Shared by '" + map.creatorEmail + "'";
      }
    } else {
      return "";
    }
  };

  const toggleShareFlag = (map: Map) => {
    const graphqlClient = generateClient();

    const mapDetails = {
      id: map.id,
      shared: !map.shared,
    };

    graphqlClient
      .graphql({
        query: mutations.updateMap,
        variables: { input: mapDetails },
      })
      .then((response) => {
        handleUpdateMap(response.data.updateMap);
      })
      .catch((error) => {
        console.log("update Map Error: ", error);
      });
  };

  return (
    <>
      <Card
        variant="outline"
        borderColor={cardBorderColor}
        backgroundColor={cardBackgroundColor}
      >
        <CardBody padding={0}>
          <Center>
            <Tooltip
              placement="top"
              openDelay={1000}
              hasArrow
              label={textForSharedLabel()}
              bg="gray.300"
              color="black"
            >
              <Image src={map.mapPicS3Url!} borderTopRadius={4} />
            </Tooltip>
          </Center>
          <HStack
            justifyContent={"space-between"}
            paddingLeft={3}
            paddingRight={3}
            paddingTop={1}
            paddingBottom={2}
          >
            <Stack mt="2" spacing="1">
              <Heading size="sm">{map.name}</Heading>
              <Text>{map.description}</Text>
              <Text fontSize="xs" textColor="gray.500">
                Category: {categoryLabel(map.category)}
              </Text>
            </Stack>
            <Stack minH="40px">
              <Icon as={TbGrid4X4} display={map.gridded ? "flex" : "none"} />
              <Icon
                as={MdOutlineShare}
                display={map.shared ? "flex" : "none"}
              />
            </Stack>
          </HStack>
        </CardBody>
        <Divider />
        <CardFooter padding={2}>
          <Text
            display={loggedInEmail != map.creatorEmail ? "flex" : "none"}
            padding="6px"
            fontSize="sm"
          >
            {textForSharedLabel()}
          </Text>

          <ButtonGroup
            size="sm"
            isAttached
            display={loggedInEmail == map.creatorEmail ? "flex" : "none"}
          >
            <Button
              isDisabled={true}
              display={loggedInEmail == map.creatorEmail ? "flex" : "none"}
              variant="outline"
              leftIcon={<MdOutlineEditNote />}
              size="sm"
            >
              Edit
            </Button>
            <Tooltip
              hasArrow
              label="Show the Map in original Size"
              bg="gray.300"
              color="black"
              openDelay={1000}
            >
              <Button
                display={loggedInEmail == map.creatorEmail ? "flex" : "none"}
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowFullsizeMapModalOpen(true);
                }}
              >
                <HiOutlineMagnifyingGlass />
              </Button>
            </Tooltip>

            <Tooltip
              hasArrow
              label="Delete the Map"
              bg="gray.300"
              color="black"
              openDelay={1000}
            >
              <Button
                display={loggedInEmail == map.creatorEmail ? "flex" : "none"}
                variant="outline"
                size="sm"
                onClick={() => {
                  setDeleteMapConfirmModalOpen(true);
                }}
              >
                <MdOutlineDelete />
              </Button>
            </Tooltip>
            <Tooltip
              hasArrow
              label="Share the Map"
              bg="gray.300"
              color="black"
              openDelay={1000}
            >
              <Button
                display={loggedInEmail == map.creatorEmail ? "flex" : "none"}
                variant="outline"
                size="sm"
                onClick={() => toggleShareFlag(map)}
              >
                <MdOutlineShare />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <MapDeleteConfirmationAlert
        map={map}
        isOpen={isDeleteMapConfirmModalOpen}
        onClose={onDeleteMapAlertConfirmClose}
        onCloseAfterDelete={onDeleteMapAlertConfirmCloseAfterDelete}
      />
      <MapDisplayModal
        map={map}
        isOpen={isShowFullsizeMapModalOpen}
        onClose={() => {
          onFullSizeMapClose();
        }}
      />
    </>
  );
};

export default MapCard;
