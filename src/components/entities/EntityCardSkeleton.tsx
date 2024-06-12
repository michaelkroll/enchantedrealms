import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const EntityCardSkeleton = () => {
  return (
    <Card>
      <Skeleton height="268px" width="268px" borderTopRadius="lg" />
      <CardBody>
        <SkeletonText noOfLines={3} spacing="4" />
      </CardBody>
    </Card>
  );
};

export default EntityCardSkeleton;
