import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const TokenCardSkeleton = () => {
  return (
    <Card>
      <Skeleton height="268px" width="268px" borderTopRadius="lg" />
      <CardBody>
        <SkeletonText noOfLines={4} spacing="4" />
      </CardBody>
    </Card>
  );
};

export default TokenCardSkeleton;
