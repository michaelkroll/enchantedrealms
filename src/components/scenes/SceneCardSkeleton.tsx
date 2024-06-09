import { Card, CardBody, SkeletonText } from "@chakra-ui/react";

const SceneCardSkeleton = () => {
  return (
    <Card>
      <CardBody>
        <SkeletonText noOfLines={5} spacing="4" />
      </CardBody>
    </Card>
  );
};

export default SceneCardSkeleton;
