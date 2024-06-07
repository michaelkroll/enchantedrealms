import { Text, Select, HStack } from "@chakra-ui/react";

import Category from "../data/Category";

interface Props {
  onSelectCategory: (category: Category) => void;
  categories: Category[];
}

const CategorySelector = ({ onSelectCategory, categories }: Props) => {
  return (
    <HStack>
      <Text as="b" mr={2}>Category</Text>
      <Select
        onChange={(event) => {
          let cat = categories.find((category) =>
            category.label === event.target.value ? category : null
          );
          if (!cat) {
            cat = { value: "all", label: "All" };
          }
          onSelectCategory(cat!);
        }}
      >
        <option key="all" value="All">
          All
        </option>
        {categories.map((category) => (
          <option key={category.value} value={category.label}>
            {category.label}
          </option>
        ))}
        ;
      </Select>
    </HStack>
  );
};

export default CategorySelector;
