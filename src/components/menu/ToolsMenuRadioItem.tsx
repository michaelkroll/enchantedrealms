// React Imports
import { PropsWithChildren } from "react";

// Chakra UI imports
import {
  Box,
  Icon,
  Tooltip,
  UseRadioProps,
  useColorModeValue,
  useRadio,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

interface Props {
  radioProps: PropsWithChildren<UseRadioProps>;
  icon: IconType;
}

const ToolsMenuRadioItem = ({ radioProps, icon }: Props) => {
  const { getInputProps, getRadioProps } = useRadio(radioProps);

  const inputProps = getInputProps();
  const radioButtonProps = getRadioProps();

  const buttonColor = useColorModeValue("gray.300", "gray.700");
  const buttonHoverColor = useColorModeValue("blue.400", "blue.300");
  const buttonActiveColor = useColorModeValue("blue.500", "blue.500");
  const buttonCheckedColor = useColorModeValue("blue.500", "blue.500");
  const buttonIconColor = useColorModeValue("black", "white");

  return (
    <Tooltip
      hasArrow
      placement="left"
      label={radioProps.value}
      bg="gray.300"
      color="black"
      openDelay={1000}
    >
      <Box as="label">
        <input {...inputProps} />
        <Box
          paddingTop="6px"
          paddingLeft="4px"
          paddingRight="4px"

          background={buttonColor}
          borderRadius="5px"
          {...radioButtonProps}
          _hover={{
            bgColor: buttonHoverColor,
            borderRadius: "5px",
          }}
          _checked={{
            bgColor: buttonCheckedColor,
            borderRadius: "5px",
          }}
          _active={{
            bgColor: buttonActiveColor,
            borderRadius: "5px",
          }}
        >
          <Icon as={icon} width="32px" height="28px" color={buttonIconColor} />
        </Box>
      </Box>
    </Tooltip>
  );
};

export default ToolsMenuRadioItem;
