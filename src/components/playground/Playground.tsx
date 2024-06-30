// Chakra UI imports
import { Text } from "@chakra-ui/react";

// Custom imports
import Adventure from "../../data/Adventure";

interface Props {
  email: string;
  sub: string;
  adventures: Adventure[];
}

const Playground = ({ email, sub, adventures }: Props) => {
  return (
    <>
      <Text>Email: {email}</Text>
      <Text>sub: {sub}</Text>
      <Text>Number of Adventures created: {adventures.length}</Text>
    </>
  );
};

export default Playground;
