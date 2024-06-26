import { useEffect, useState } from "react";

// Storage S3
import { getUrl } from "aws-amplify/storage";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import { listAdventures } from "../../graphql/queries";

import {
  Box,
  Button,
  HStack,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { IoReload } from "react-icons/io5";
import AdventureCard from "./AdventureCard";
import Adventure from "../../data/Adventure";
import AdventureCreateDrawer from "./AdventureCreateDrawer";
import AdventureEditDrawer from "./AdventureEditDrawer";
import IsLoadingIndicator from "../IsLoadingIndicator";

interface Props {
  email: string;
  sub: string;
  onAdventuresUpdated: (adventures: Adventure[]) => void;
}

const AdventureGrid = ({ email, sub, onAdventuresUpdated }: Props) => {
  const {
    isOpen: isCreateDrawerOpen,
    onOpen: onCreateDrawerOpen,
    onClose: onCreateDrawerClose,
  } = useDisclosure();

  const {
    isOpen: isEditDrawerOpen,
    onOpen: onEditDrawerOpen,
    onClose: onEditDrawerClose,
  } = useDisclosure();

  const [editAdventure, setEditAdventure] = useState<Adventure>();
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

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
        onAdventuresUpdated(adventureList);
        setLoading(false);
      })
      .catch((error) => {
        setAdventures([]);
        onAdventuresUpdated([]);
        setError(error);
        setLoading(false);
      });
  };

  const handleCreateDrawerClose = () => {
    onCreateDrawerClose();
    handleListAdventures();
  };

  const handleEditDrawerClose = () => {
    onEditDrawerClose();
    handleListAdventures();
  };

  const handleRefreshGrid = () => {
    setAdventures([]);
    handleListAdventures();
  };

  const handleUpdateAdventure = (updatedAdventure: Adventure) => {
    const updatedAdventures = adventures.map((adventure) =>
      adventure.id === updatedAdventure.id
        ? { ...adventure, players: updatedAdventure.players }
        : adventure
    );

    setAdventures(updatedAdventures);
    onAdventuresUpdated(updatedAdventures);
  };

  const handleEditAdventure = (editAdventure: Adventure) => {
    setEditAdventure(editAdventure);
    onEditDrawerOpen();
  };

  return (
    <Box me={2} mt={2} mb={2}>
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
            onClick={onCreateDrawerOpen}
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

      {isLoading && (
        <IsLoadingIndicator loadingLabel={"Loading adventures..."} />
      )}

      <AdventureCreateDrawer
        handleDrawerClose={handleCreateDrawerClose}
        isDrawerOpen={isCreateDrawerOpen}
        onCloseDrawer={onCreateDrawerClose}
        email={email}
        sub={sub}
      />

      <AdventureEditDrawer
        handleDrawerClose={handleEditDrawerClose}
        isDrawerOpen={isEditDrawerOpen}
        onCloseDrawer={onEditDrawerClose}
        editAdventure={editAdventure!}
      />

      {error && <Text color="tomato">{error}</Text>}

      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 1, lg: 3, xl: 4, "2xl": 5 }}
        spacing={3}
        margin="10px"
      >
        {/* {isLoading &&
          skeletons.map((skeleton) => <AdventureCardSkeleton key={skeleton} />)} */}

        {adventures.map((adventure) => (
          <AdventureCard
            key={adventure.id}
            adventure={adventure}
            loggedInEmail={email}
            refreshGrid={handleRefreshGrid}
            handleUpdateAdventure={handleUpdateAdventure}
            handleEditAdventure={handleEditAdventure}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AdventureGrid;
