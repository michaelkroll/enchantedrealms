// Chakra UI imports
import {
  Box,
  Checkbox,
  HStack,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

// Custom imports
import Adventure from "../../data/Adventure";
import useMaps from "../../hooks/useMaps";
import CategorySelector from "../CategorySelector";
import Category from "../../data/Category";
import mapCategories from "../../data/map/MapCategories";
import { useState } from "react";

interface Props {
  email: string;
  sub: string;
  adventures: Adventure[];
}

const Playground = ({ email, sub, adventures }: Props) => {
  const [mapCategory, setMapCategory] = useState<Category>({
    value: "all",
    label: "All",
  });
  const [showSharedMaps, setShowSharedMaps] = useState<boolean>(true);

  const { maps } = useMaps(
    "m.kroll@mac.com",
    mapCategory.value,
    showSharedMaps
  );

  const handleMapCategorySelected = (selectedCategory: Category) => {
    setMapCategory(selectedCategory);
  };

  const handleMapSharedFlagSelected = (selectedFlag: boolean) => {
    setShowSharedMaps(selectedFlag);
  };

  return (
    <>
      <Stack m={5}>
        <Text>Email: {email}</Text>
        <Text>sub: {sub}</Text>
        <Text>Number of Adventures created: {adventures.length}</Text>
        <Box
          bg="gray.700"
          paddingLeft={5}
          paddingTop={2}
          paddingBottom={5}
          borderRadius={10}
        >
          <HStack mb={5}>
            <CategorySelector
              onSelectCategory={handleMapCategorySelected}
              categories={mapCategories}
            />
            <Checkbox
              id="ShowSharedCheckbox"
              defaultChecked
              onChange={(e) => {
                handleMapSharedFlagSelected(e.target.checked);
              }}
            >
              Show Shared Maps
            </Checkbox>
          </HStack>

          <UnorderedList styleType="'-'">
            {maps.map((map) => (
              <ListItem key={map.id}>
                {map.name} - Created by: {map.creatorEmail} - Grid:{" "}
                {map.gridded ? "true" : "false"}
                {map.gridded}
              </ListItem>
            ))}
          </UnorderedList>
          {maps.length == 0 && (
            <Text>No Maps found matching the search criteria.</Text>
          )}
        </Box>
      </Stack>
    </>
  );
};

export default Playground;
