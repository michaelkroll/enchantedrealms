import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const TokenCardSkeleton = () => {
  return (
    <Card>
      <Skeleton height="260px" width="260px" />
      <CardBody>
        <SkeletonText noOfLines={4} spacing="4" />
      </CardBody>
    </Card>
  );
};

export default TokenCardSkeleton;
