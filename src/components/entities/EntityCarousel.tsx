// Chakra UI imports
import {
  Box,
  Center,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Carousel imports
import { Carousel } from "../carousel/Carousel";
import { Context, ContextType, Provider } from "../carousel/Provider";
import { LeftButton } from "../carousel/LeftButton";
import { RightButton } from "../carousel/RightButton";
import EntityCarouselCard from "./EntityCarouselCard";

// React Icon imports
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import EntityComposition from "../../data/EntityComposition";
import { MutableRefObject } from "react";

interface Props {
  dragUrl: MutableRefObject<string | undefined>;
  entityCompositions?: (EntityComposition | null)[] | null | undefined;
}

const EntityCarousel = ({ dragUrl, entityCompositions }: Props) => {
  const carouselBackgroundColor = useColorModeValue("gray.300", "gray.600");
  const buttonColor = useColorModeValue("gray.50", "gray.700");
  const buttonHoverColor = useColorModeValue("blue.400", "blue.500");
  const buttonActiveColor = useColorModeValue("blue.500", "blue.500");

  const getCarouselPositionText = (
    context: ContextType,
    numberOfEntities: number
  ) => {
    const activeItem = context?.activeItem;
    const constraint = context?.constraint;

    let rightCounter =
      constraint > numberOfEntities
        ? numberOfEntities
        : activeItem + constraint;

    return (
      "Showing " +
      (activeItem + 1) +
      " - " +
      rightCounter +
      " out of " +
      numberOfEntities +
      " entities"
    );
  };

  return (
    <Center>
      <Box
        paddingLeft={1}
        paddingRight={1}
        width="500px"
        height="225px"
        display="flex"
        position="absolute"
        bottom="5px"
        bg={carouselBackgroundColor}
        mt={4}
        rounded="md"
        gap={1}
      >
        <Provider>
          <Stack width="100%" height="220px">
            <Carousel gap={5}>
              {entityCompositions!.map((composition) => (
                <EntityCarouselCard
                  key={composition!.entity.id}
                  entity={composition!.entity}
                  dragUrlRef={dragUrl}
                />
              ))}
            </Carousel>
            <HStack justify="space-between">
              <Context.Consumer>
                {(context) => (
                  <LeftButton
                    isDisabled={
                      entityCompositions?.length! < context?.constraint!
                    }
                    height="24px"
                    mb={1}
                    ms={1}
                    background={buttonColor}
                    _hover={{ bgColor: buttonHoverColor }}
                    _active={{ bgColor: buttonActiveColor }}
                    customIcon={<FaArrowLeftLong />}
                  />
                )}
              </Context.Consumer>
              <Context.Consumer>
                {(context) => (
                  <Text>
                    {getCarouselPositionText(
                      context!,
                      entityCompositions?.length!
                    )}
                  </Text>
                )}
              </Context.Consumer>
              <Context.Consumer>
                {(context) => (
                  <RightButton
                    isDisabled={
                      entityCompositions?.length! < context?.constraint!
                    }
                    height="24px"
                    mb={1}
                    me={1}
                    background={buttonColor}
                    _hover={{ bgColor: buttonHoverColor }}
                    _active={{ bgColor: buttonActiveColor }}
                    customIcon={<FaArrowRightLong />}
                  />
                )}
              </Context.Consumer>
            </HStack>
          </Stack>
        </Provider>
      </Box>
    </Center>
  );
};

export default EntityCarousel;
