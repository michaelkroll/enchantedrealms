// React imports
import { useEffect, useState } from "react";

// Chakra UI imports
import {
  Box,
  Card,
  CardBody,
  Divider,
  SimpleGrid,
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
  handleSelectedAdventure: (selectedAdventure: Adventure) => void;
}

const AdventureSelector = ({ email, handleSelectedAdventure }: Props) => {
  const adventureCardColor = useColorModeValue("gray.200", "gray.600");
  const adventureCardSelectedColor = useColorModeValue("blue.200", "blue.600");

  const [adventures, setAdventures] = useState<Adventure[]>([]);

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
    handleSelectedAdventure(selectedAdventure);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" padding={3} borderColor="gray.600">
      <Text paddingBottom="10px">Adventure Selector</Text>
      <Divider />

      <SimpleGrid columns={1} spacing={1} paddingTop={2}>
        {adventures.map((adventure) => (
          <Card
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
            <CardBody>
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
