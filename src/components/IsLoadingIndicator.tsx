import { Flex, Spinner, Text, VStack } from "@chakra-ui/react";

interface Props {
  loadingLabel: string;
}

const IsLoadingIndicator = ({ loadingLabel }: Props) => {
  return (
    <Flex
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
        <Text as="b">{loadingLabel}</Text>
      </VStack>
    </Flex>
  );
};

export default IsLoadingIndicator;
