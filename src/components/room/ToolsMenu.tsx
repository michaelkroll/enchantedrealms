// Chakra UI imports
import {
  Box,
  Collapse,
  IconButton,
  Tooltip,
  useBoolean,
  useColorModeValue,
  useRadioGroup,
} from "@chakra-ui/react";

// React Icon Imports
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import moveIcon from "../../assets/move-icon.svg";
import selectIcon from "../../assets/select-icon.svg";
import ToolsMenuRadioItem from "./ToolsMenuRadioItem";
import { useState } from "react";

interface Props {
  positionTop: string;
  positionRight: string;
  direction: string;
  handleToolSelected: (toolName: string) => void;
}

const ToolsMenu = ({
  positionTop,
  positionRight,
  direction,
  handleToolSelected,
}: Props) => {
  const [toolsMenuEnabled, setToolsMenuEnabled] = useBoolean(false);
  const buttonBackground = useColorModeValue("gray.200", "gray.700");
  const toolsMenuBackground = useColorModeValue("gray.200", "gray.700");
  const [selectedTool, setSelectedTool] = useState("");

  const menuItems = [
    {
      name: "Move",
      image: moveIcon,
    },
    {
      name: "Select",
      image: selectIcon,
    },
  ];

  const handleChange = (value: string) => {
    setSelectedTool(value);
    handleToolSelected(value);
  };

  const { getRadioProps } = useRadioGroup({
    onChange: handleChange,
  });

  const getOpenToolsMenuString = (): string => {
    if (selectedTool === "") {
      return "Open Tools Menu";
    } else {
      return "Open Tools Menu. Tool '" + selectedTool + "' is selected. ";
    }
  };

  return (
    <>
      <Tooltip
        hasArrow
        placement="left"
        label={toolsMenuEnabled ? "Close Tools Menu" : getOpenToolsMenuString()}
        bg="gray.300"
        color="black"
        openDelay={1000}
      >
        <IconButton
          bg={buttonBackground}
          position="absolute"
          top={positionTop}
          right={positionRight}
          size="lg"
          aria-label="Menu"
          icon={toolsMenuEnabled ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
          onClick={setToolsMenuEnabled.toggle}
        />
      </Tooltip>

      <Collapse in={toolsMenuEnabled} animateOpacity>
        <Box
          padding={1}
          display="flex"
          flexDirection={direction === "column" ? "column" : "row"}
          position="absolute"
          top="40px"
          right="5px"
          color="white"
          bg={toolsMenuBackground}
          mt={5}
          rounded="md"
          gap={1}
        >
          {menuItems.map((menuItem) => (
            <ToolsMenuRadioItem
              key={menuItem.name}
              image={menuItem.image}
              radioProps={{
                ...getRadioProps({
                  value: menuItem.name,
                }),
              }}
            />
          ))}

          {/* <Tooltip
            placement="left"
            hasArrow
            label="Move"
            bg="gray.300"
            color="black"
            openDelay={1000}
          >
            <IconButton
              colorScheme="gray"
              mb={1}
              aria-label="Move"
              icon={<IoMdMove />}
            />
          </Tooltip>
          <Tooltip
            placement="left"
            hasArrow
            label="Select"
            bg="gray.300"
            color="black"
            openDelay={1000}
          >
            <IconButton
              colorScheme="gray"
              aria-label="Select"
              icon={<LuLassoSelect />}
            />
          </Tooltip> */}
        </Box>
      </Collapse>
    </>
  );
};

export default ToolsMenu;
