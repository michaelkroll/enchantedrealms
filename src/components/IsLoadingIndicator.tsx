import {
  Flex,
  Spinner,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

interface Props {
  loadingLabel: string;
}

const IsLoadingIndicator = ({ loadingLabel }: Props) => {
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Flex
      mt={10}
      width={"100%"}
      height={"100%"}
      alignContent={"center"}
      justifyContent={"center"}
    >
      <VStack>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text textColor={textColor} as="b">
          {loadingLabel}
        </Text>
      </VStack>
    </Flex>
  );
};

export default IsLoadingIndicator;
