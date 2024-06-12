// Chakra UI imports
import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const SceneCardSkeleton = () => {
  return (
    <Card>
      <Skeleton height="200px" width="325px" borderTopRadius="lg" />
      <CardBody>
        <SkeletonText noOfLines={5} spacing="4" />
      </CardBody>
    </Card>
  );
};

export default SceneCardSkeleton;
