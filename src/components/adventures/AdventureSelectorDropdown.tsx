// Chakra UI imports
import { Text, Select, HStack } from "@chakra-ui/react";
import Adventure from "../../data/Adventure";

interface Props {
  onSelectAdventure: (adventure: Adventure) => void;
  display: string;
  adventures: Adventure[];
}

const AdventureSelectorDropdown = ({
  onSelectAdventure,
  display,
  adventures,
}: Props) => {
  return (
    <HStack display={display}>
      <Text as="b" mr={2}>
        Adventure
      </Text>
      <Select
        onChange={(event) => {
          if (event.target.value != "Select an Adventure") {
            let adv = adventures.find((adventure) =>
              adventure.name === event.target.value ? adventure : null
            );
            onSelectAdventure(adv!);
          }
        }}
      >
        <option key={0} value="Select an Adventure">
          Select an Adventure
        </option>
        {adventures.map((adventure) => (
          <option key={adventure.id} value={adventure.name}>
            {adventure.name}
          </option>
        ))}
        ;
      </Select>
    </HStack>
  );
};

export default AdventureSelectorDropdown;
