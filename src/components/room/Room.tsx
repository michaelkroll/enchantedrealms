import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  email: string;
  sub: string;
}

const Room = ({ email, sub }: Props) => {
  const navigate = useNavigate();
  const params = useParams();

  console.log("Params: ", params);
  console.log("Email: ", email);
  console.log("Sub: ", sub);

  return (
    <Box as="section">
      <Container py={{ base: "16", md: "24" }}>
        <Stack spacing={{ base: "8", md: "10" }}>
          <Stack spacing={{ base: "4", md: "5" }} align="center">
            <Divider />
            <Heading size={{ base: "sm", md: "md" }}>
              This is the Room for Adventure
            </Heading>
            <Text maxW="2xl" textAlign="center" fontSize="xl">
              "{params.adventureId}"
            </Text>
            <Divider />
            <Heading size={{ base: "sm", md: "md" }}>
              You have joined as user
            </Heading>
            <Text maxW="2xl" textAlign="center" fontSize="xl">
              "{email}"
            </Text>
            <Divider />
            <Text maxW="2xl" textAlign="center" fontSize="xl">
              Here the scenes will be placed by the game master and entities can
              be moved by the GM and the players
            </Text>
            <Divider />
          </Stack>
          <Stack
            spacing="3"
            direction={{ base: "column", sm: "row" }}
            justify="center"
          >
            <Button
            colorScheme='blue'
              onClick={() => {
                navigate("/adventures");
              }}
            >
              Back to Adventures
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Room;
