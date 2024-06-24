// Chakra UI imports
import { Text, Select, HStack } from "@chakra-ui/react";
import Adventure from "../../data/Adventure";
import { useEffect, useRef } from "react";

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
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const adventureId = localStorage.getItem(
      "comingBackFromSceneEditorAdventureId"
    );
    if (adventureId) {
      const adventure = adventures.filter((adv) => adv.id === adventureId)[0];
      onSelectAdventure(adventure);
      if (selectRef.current) {
        selectRef.current.value = adventure?.name;
      }
      localStorage.removeItem("comingBackFromSceneEditorAdventureId");
    }
  }, []);

  return (
    <HStack display={display}>
      <Text as="b" mr={2}>
        Adventure
      </Text>
      <Select
        ref={selectRef}
        onChange={(event) => {
          if (event.target.value != "Select Adventure") {
            let adv = adventures.find((adventure) =>
              adventure.name === event.target.value ? adventure : null
            );
            onSelectAdventure(adv!);
          }
        }}
      >
        <option key={0} value="Select Adventure">
          Select Adventure
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
