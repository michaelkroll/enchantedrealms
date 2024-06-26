// Chakra UI imports
import {
  Box,
  Collapse,
  IconButton,
  Tooltip,
  useBoolean,
  useColorModeValue,
} from "@chakra-ui/react";

// React Icon Imports
import { TiArrowSortedUp } from "react-icons/ti";
import { MdCenterFocusStrong } from "react-icons/md";
import { TbArrowsMaximize } from "react-icons/tb";
import { BiSolidCircleQuarter } from "react-icons/bi";
import { BiSolidCircleHalf } from "react-icons/bi";
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { BiSolidCircle } from "react-icons/bi";
import { PiResize } from "react-icons/pi";

interface Props {
  positionTop: string;
  positionRight: string;
  direction: string;
  handleFunctionSelected: (selectedFunction: string) => void;
}

export enum Functions {
  Center = "CENTER",
  FitToSreen = "FIT",
  Scale25Percent = "SCALE25",
  Scale50Percent = "SCALE50",
  Scale75Percent = "SCALE75",
  Scale100Percent = "SCALE100"
}

const FunctionMenu = ({
  positionTop,
  positionRight,
  direction,
  handleFunctionSelected,
}: Props) => {
  const [functionsMenuEnabled, setFunctionsMenuEnabled] = useBoolean(false);
  const functionsMenuBackgroundColor = useColorModeValue(
    "gray.300",
    "gray.600"
  );
  const functionButtonColor = useColorModeValue("gray.50", "gray.700");
  const functionButtonHoverColor = useColorModeValue("blue.150", "blue.500");

  const menuItems = [
    {
      name: "Center",
      function: Functions.Center,
      icon: <MdCenterFocusStrong />,
    },
    {
      name: "Fit to Screen",
      function: Functions.FitToSreen,
      icon: <TbArrowsMaximize />,
    },
    {
      name: "Scale 25%",
      function: Functions.Scale25Percent,
      icon: <BiSolidCircleQuarter />,
    },
    {
      name: "Scale 50%",
      function: Functions.Scale50Percent,
      icon: <BiSolidCircleHalf />,
    },
    {
      name: "Scale 75%",
      function: Functions.Scale75Percent,
      icon: <BiSolidCircleThreeQuarter />,
    },
    {
      name: "Original Size 100%",
      function: Functions.Scale100Percent,
      icon: <BiSolidCircle />,
    },
  ];

  return (
    <>
      <Tooltip
        hasArrow
        placement="left"
        label={
          functionsMenuEnabled ? "Close Menu" : "Open Size and Scale Functions Menu"
        }
        bg="gray.300"
        color="black"
        openDelay={1000}
      >
        <IconButton
          bg={functionButtonColor}
          _hover={{ bgColor: functionButtonHoverColor }}
          position="absolute"
          top={positionTop}
          right={positionRight}
          size="lg"
          aria-label="Menu"
          icon={
            functionsMenuEnabled ? <TiArrowSortedUp/> : <PiResize />
          }
          onClick={setFunctionsMenuEnabled.toggle}
        />
      </Tooltip>

      <Collapse in={functionsMenuEnabled} animateOpacity>
        <Box
          padding={1}
          display="flex"
          flexDirection={direction === "column" ? "column" : "row"}
          position="absolute"
          top="40px"
          right="5px"
          color="white"
          bg={functionsMenuBackgroundColor}
          mt={4}
          rounded="md"
          gap={1}
        >
          {menuItems.map((menuItem) => (
            <Tooltip
              hasArrow
              key={menuItem.name}
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
                background={functionButtonColor}
                _hover={{ bgColor: functionButtonHoverColor }}
                aria-label={menuItem.name}
                onClick={() => handleFunctionSelected(menuItem.function)}
              />
            </Tooltip>
          ))}
        </Box>
      </Collapse>
    </>
  );
};

export default FunctionMenu;
