import { Flex, Spinner, Text, VStack } from "@chakra-ui/react";

interface Props {
  loadingLabel: string;
}

const IsLoadingIndicator = ({ loadingLabel }: Props) => {
  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
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
        <Text>{loadingLabel}</Text>
      </VStack>
    </Flex>
  );
};

export default IsLoadingIndicator;
