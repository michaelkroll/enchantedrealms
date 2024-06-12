import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const AdventureCardSkeleton = () => {
  return (
    <Card>
      <Skeleton height="200px" width="325px" borderTopRadius="lg" />
      <CardBody>
        <SkeletonText noOfLines={15} spacing="4" />
      </CardBody>
    </Card>
  );
};

export default AdventureCardSkeleton;
