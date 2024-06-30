// React imports
import { MutableRefObject } from "react";

// Chakra UI imports
import {
  Card,
  CardBody,
  Center,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom imports
import Entity from "../../data/entity/Entity";

interface Props {
  entity: Entity;
  dragUrlRef: MutableRefObject<string | undefined>;
}

const EntityCarouselCard = ({ entity, dragUrlRef }: Props) => {
  const cardBorderColor = useColorModeValue("gray.300", "gray.600");
  const cardBackgroundColor = useColorModeValue("gray.50", "gray.700");

  return (
    <Card
      variant="outline"
      borderColor={cardBorderColor}
      backgroundColor={cardBackgroundColor}
    >
      <CardBody padding={3}>
        <Image
          src={entity.tokenPicS3Url!}
          borderRadius="lg"
          mb={1}
          draggable="true"
          onDragStart={() => {
            dragUrlRef.current = JSON.stringify(entity);
          }}
        />
        <Center>
          <Text as="b" fontSize="xx-small">
            {entity.name}
          </Text>
        </Center>
      </CardBody>
    </Card>
  );
};

export default EntityCarouselCard;
