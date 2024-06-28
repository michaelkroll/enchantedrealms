// React Imports
import { PropsWithChildren } from "react";

// Chakra UI imports
import {
  Box,
  Image,
  Tooltip,
  UseRadioProps,
  useColorModeValue,
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

  //const toolsMenuBackgroundColor = useColorModeValue("gray.300", "gray.600");
  const toolsButtonColor = useColorModeValue("gray.50", "gray.700");
  const toolsButtonHoverColor = useColorModeValue("blue.250", "blue.700");
  const toolsButtonSelectedColor = useColorModeValue("blue.150", "blue.500");

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
          background={toolsButtonColor}
          px={1}
          py={1}
          {...radioButtonProps}
          _hover={{
            bgColor: toolsButtonHoverColor,
            borderRadius: "5px",
          }}
          _checked={{
            bgColor: toolsButtonSelectedColor,
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
