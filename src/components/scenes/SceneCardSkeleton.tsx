import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const SceneCardSkeleton = () => {
  return (
    <Card>
      <Skeleton height="300px" width="400px" />
      <CardBody>
        <SkeletonText noOfLines={3} spacing="4" />
      </CardBody>
    </Card>
  );
};

export default SceneCardSkeleton;
