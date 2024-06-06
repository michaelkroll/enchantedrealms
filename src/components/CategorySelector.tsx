import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FaCaretDown } from "react-icons/fa";
import Category from "../data/Category";

interface Props {
  onSelectCategory: (category: Category) => void;
  selectedCategory: Category;
  categories: Category[];
}

const CategorySelector = ({
  onSelectCategory,
  selectedCategory,
  categories,
}: Props) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<FaCaretDown />}>
        Category: {selectedCategory.label}
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => onSelectCategory({ value: "all", label: "All" })}
          key={"all"}
          value={"all"}
        >
          All
        </MenuItem>
        {categories.map((category) => (
          <MenuItem
            onClick={() => onSelectCategory(category)}
            key={category.value}
            value={category.value}
          >
            {category.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CategorySelector;
