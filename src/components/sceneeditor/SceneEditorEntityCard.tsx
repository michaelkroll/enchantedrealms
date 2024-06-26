import Entity from "../../data/Entity";
import {
  Card,
  CardBody,
  Center,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

interface Props {
  entity: Entity;
}

const SceneEditorEntityCard = ({ entity }: Props) => {
  const cardBorderColor = useColorModeValue("gray.300", "gray.600");
  const cardBackgroundColor = useColorModeValue("gray.50", "gray.700");

  return (
    <Card
      variant="outline"
      borderColor={cardBorderColor}
      backgroundColor={cardBackgroundColor}
    >
      <CardBody padding={3}>
        <Image src={entity.tokenPicS3Url!} borderRadius="lg" mb={1} />
        <Center>
          <Text as="b" fontSize="xx-small">
            {entity.name}
          </Text>
        </Center>
      </CardBody>
    </Card>
  );
};

export default SceneEditorEntityCard;
