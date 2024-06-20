// React Imports
import { PropsWithChildren } from "react";

// Chakra UI imports
import {
  Box,
  Image,
  Tooltip,
  UseRadioProps,
  useColorMode,
  useRadio,
} from "@chakra-ui/react";

interface Props {
  radioProps: PropsWithChildren<UseRadioProps>;
  image: string;
}

const ToolsMenuRadioItem = ({ radioProps, image }: Props) => {
  const { getInputProps, getRadioProps } = useRadio(radioProps);

  const inputProps = getInputProps();
  const radioButtonProps = getRadioProps();

  const { colorMode } = useColorMode();

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
          px={1}
          py={1}
          {...radioButtonProps}
          _hover={{
            bg: colorMode === "light" ? "gray.300" : "gray.500",
            borderRadius: "5px",
          }}
          _focus={{
            borderRadius: "5px",
            color: "white",
          }}
          _checked={{
            bg: colorMode === "light" ? "gray.400" : "gray.300",
            borderRadius: "5px",
            color: "white",
          }}
        >
          <Image src={image} width="32px" height="32px" />
        </Box>
      </Box>
    </Tooltip>
  );
};

export default ToolsMenuRadioItem;
