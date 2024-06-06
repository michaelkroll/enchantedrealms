import { useEffect, useState } from "react";

// Storage S3
import { getUrl } from "aws-amplify/storage";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import { listAdventures } from "../../graphql/queries";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { IoReload } from "react-icons/io5";
import AdventureCreateForm from "./AdventureCreateForm";
import AdventureCard from "./AdventureCard";
import AdventureCardSkeleton from "./AdventureCardSkeleton";
import Adventure from "../../data/Adventure";

interface Props {
  email: string;
  sub: string;
}

const AdventureGrid = ({ email, sub }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    if (email != "") {
      handleListAdventures();
    }
  }, [email]);

  const handleListAdventures = async () => {
    setLoading(true);
    const graphqlClient = generateClient();

    const filters = {
      filter: {
        or: [
          {
            creatorEmail: {
              eq: email,
            },
          },
          {
            players: {
              contains: email,
            },
          },
        ],
      },
    };

    graphqlClient
      .graphql({
        query: listAdventures,
        variables: filters,
      })
      .then((response) => {
        const adventureList = response.data.listAdventures.items;

        adventureList.map(async (adventure) => {
          const adventurePicPath = adventure.adventurePicPath;
          const getUrlResult = await getUrl({
            path: adventurePicPath!,
            options: {
              expiresIn: 900,
            },
          });

          const adventureCoverImage = getUrlResult.url.toString();
          adventure.adventurePicS3Url = adventureCoverImage;
        });

        adventureList.sort((a, b) => a.name.localeCompare(b.name));

        setAdventures(adventureList);
        setLoading(false);
      })
      .catch((error) => {
        setAdventures([]);
        setError(error);
        setLoading(false);
      });
  };

  const handleFormClose = () => {
    onClose();
    handleListAdventures();
  };

  const handleRefreshGrid = () => {
    setAdventures([]);
    handleListAdventures();
  };

  const handleUpdateAdventure = (updatedAdventure: Adventure) => {
    console.log("updatedAdventure: ", updatedAdventure);
    setAdventures(
      adventures.map((adventure) =>
        adventure.id === updatedAdventure.id
          ? { ...adventure, players: updatedAdventure.players }
          : adventure
      )
    );
  };

  return (
    <>
      <HStack justifyContent={"space-between"}>
        <Tooltip
          hasArrow
          label="Create a new Character"
          bg="gray.300"
          color="black"
          openDelay={1000}
        >
          <Button
            isDisabled={isLoading}
            colorScheme="blue"
            onClick={onOpen}
            marginLeft="10px"
          >
            <AddIcon />
          </Button>
        </Tooltip>
        <Tooltip
          hasArrow
          label="Reload the Adventures"
          bg="gray.300"
          color="black"
          openDelay={1000}
        >
          <Button isDisabled={isLoading} onClick={handleRefreshGrid}>
            <IoReload />
          </Button>
        </Tooltip>
      </HStack>
      <Drawer
        size="md"
        variant="permanent"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton margin="5px" />
          <DrawerHeader borderBottomWidth="1px">
            Create an Adventure
          </DrawerHeader>
          <DrawerBody>
            <AdventureCreateForm
              handleFormClose={handleFormClose}
              email={email}
              sub={sub}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {error && <Text color="tomato">{error}</Text>}
      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 1, lg: 3, xl: 4, "2xl": 5 }}
        spacing={3}
        margin="10px"
      >
        {isLoading &&
          skeletons.map((skeleton) => <AdventureCardSkeleton key={skeleton} />)}
        {adventures.map((adventure) => (
          <AdventureCard
            key={adventure.id}
            adventure={adventure}
            loggedInEmail={email}
            refreshGrid={handleRefreshGrid}
            handleUpdateAdventure={handleUpdateAdventure}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default AdventureGrid;
