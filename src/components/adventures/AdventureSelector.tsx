// React imports
import { useEffect, useState } from "react";

// Chakra UI imports
import {
  Box,
  Card,
  CardBody,
  HStack,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import { listAdventures } from "../../graphql/queries";

// Custom imports
import Adventure from "../../data/Adventure";

interface Props {
  email: string;
  handleSelectedAdventure: (selectedAdventure: Adventure | null) => void;
}

const AdventureSelector = ({ email, handleSelectedAdventure }: Props) => {
  const adventureCardColor = useColorModeValue("gray.200", "gray.600");
  const adventureCardSelectedColor = useColorModeValue("blue.200", "blue.600");

  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [isAdventureSelected, setIsAdventureSelected] = useState(false);

  useEffect(() => {
    handleListAdventures();
  }, []);

  const handleListAdventures = async () => {
    const graphqlClient = generateClient();

    const listAdventureVariables = {
      filter: {
        creatorEmail: {
          eq: email,
        },
      },
    };

    graphqlClient
      .graphql({
        query: listAdventures,
        variables: listAdventureVariables,
      })
      .then((response) => {
        const adventureList = response.data.listAdventures.items;
        adventureList.sort((a, b) => a.name.localeCompare(b.name));

        setAdventures(adventureList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAdventureSelection = (selectedAdventure: Adventure) => {
    setAdventures(
      adventures.map((adventure) =>
        adventure.id != selectedAdventure.id
          ? { ...adventure, selected: false }
          : adventure
      )
    );
    handleSelectedAdventure(
      selectedAdventure.selected ? selectedAdventure : null
    );
    setIsAdventureSelected(selectedAdventure.selected!);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" padding={3} borderColor="gray.600">
      <Text mb="1" fontSize="md" display={isAdventureSelected ? "none" : "block"}>
        Please select an Adventure from the list
      </Text>
      {adventures.length == 0 ? (
        <HStack>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="md"
          />
          <Text>Fetching Adventures...</Text>
        </HStack>
      ) : (
        ""
      )}
      <SimpleGrid columns={1} spacing={1} paddingTop={0}>
        {adventures.map((adventure) => (
          <Card
            variant="outline"
            key={adventure.id}
            backgroundColor={
              adventure.selected
                ? adventureCardSelectedColor
                : adventureCardColor
            }
            onClick={() => {
              if (adventure.selected != null) {
                adventure.selected = !adventure.selected;
              } else {
                adventure.selected = true;
              }
              handleAdventureSelection(adventure);
            }}
          >
            <CardBody padding={2}>
              <Stack>
                <Text fontSize="xs">{adventure.name}</Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AdventureSelector;
