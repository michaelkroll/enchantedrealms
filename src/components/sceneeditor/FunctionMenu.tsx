// Chakra UI imports
import {
  Box,
  Collapse,
  IconButton,
  Tooltip,
  useBoolean,
} from "@chakra-ui/react";

// React Icon Imports
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { MdCenterFocusStrong } from "react-icons/md";
import { TbArrowsMaximize } from "react-icons/tb";
import { BiSolidCircleQuarter } from "react-icons/bi";
import { BiSolidCircleHalf } from "react-icons/bi";
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { BiSolidCircle } from "react-icons/bi";

interface Props {
  positionTop: string;
  positionRight: string;
  direction: string;
  handleFunctionSelected: (toolName: string) => void;
}

const FunctionMenu = ({
  positionTop,
  positionRight,
  direction,
  handleFunctionSelected,
}: Props) => {
  const [toolsMenuEnabled, setToolsMenuEnabled] = useBoolean(false);

  const menuItems = [
    {
      name: "Center",
      icon: <MdCenterFocusStrong />,
    },
    {
      name: "Fit to Screen",
      icon: <TbArrowsMaximize/>
    },
    {
      name: "Scale 25%",
      icon: <BiSolidCircleQuarter/>
    },
    {
      name: "Scale 50%",
      icon: <BiSolidCircleHalf/>
    },
    {
      name: "Scale 75%",
      icon: <BiSolidCircleThreeQuarter/>
    },
    {
      name: "Original Size 100%",
      icon: <BiSolidCircle/>
    }

  ];

  return (
    <>
      <Tooltip
        hasArrow
        placement="left"
        label={
          toolsMenuEnabled ? "Close Functions Menu" : "Open Functions Menu"
        }
        bg="gray.300"
        color="black"
        openDelay={1000}
      >
        <IconButton
          colorScheme="blue"
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
          //bg={toolsMenuBackground}
          mt={4}
          rounded="md"
          gap={1}
        >
          {menuItems.map((menuItem) => (
            <Tooltip
              hasArrow
              placement="left"
              label={menuItem.name}
              bg="gray.300"
              color="black"
              openDelay={1000}
            >
              <IconButton
                width="40px"
                icon={menuItem.icon}
                key={menuItem.name}
                colorScheme="blue"
                aria-label={menuItem.name}
                onClick={() => handleFunctionSelected(menuItem.name)}
              />
            </Tooltip>
          ))}
        </Box>
      </Collapse>
    </>
  );
};

export default FunctionMenu;
