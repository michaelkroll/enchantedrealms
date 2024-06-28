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

export enum Tools {
  Move = "Move",
  Select = "Select",
}

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
  const [selectedTool, setSelectedTool] = useState("");

  const toolsMenuBackgroundColor = useColorModeValue("gray.300", "gray.600");
  const toolsButtonColor = useColorModeValue("gray.50", "gray.700");
  const toolsButtonHoverColor = useColorModeValue("blue.150", "blue.500");

  const tools = [
    {
      name: "Move",
      tool: Tools.Move,
      image: moveIcon,
    },
    {
      name: "Select",
      tool: Tools.Select,
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
          background={toolsButtonColor}
          _hover={{ bgColor: toolsButtonHoverColor }}
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
          background={toolsMenuBackgroundColor}
          mt={5}
          rounded="md"
          gap={1}
        >
          {tools.map((tool) => (
            <ToolsMenuRadioItem
              key={tool.tool}
              image={tool.image}
              radioProps={{
                ...getRadioProps({
                  value: tool.name,
                }),
              }}
            />
          ))}
        </Box>
      </Collapse>
    </>
  );
};

export default ToolsMenu;