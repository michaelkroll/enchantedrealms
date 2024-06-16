import { Box, Button, Container, Divider, Stack, Text } from "@chakra-ui/react";
import { Message } from "ably";
import { useChannel } from "ably/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  email: string;
  sub: string;
}

const Room = ({ email, sub }: Props) => {

  const navigate = useNavigate();
  const params = useParams();

  const [messages, setMessages] = useState<Message[]>([]);

  // Create a channel called 'get-started' and subscribe to all messages with the name 'first' using the useChannel hook
  const { channel } = useChannel("enchanted-realms", "first", (message) => {
    setMessages((prev) => [...prev, message]);
  });

  const messagePreviews = messages.map((msg, index) => (
    <li key={index}>{msg.data}</li>
  ));

  console.log("Params: ", params);
  console.log("Email: ", email);
  console.log("Sub: ", sub);

  const publishMessage = () => {
    channel.publish("first", "sender: " + email);
  };

  return (
    <Box>
      <Container>
        <Stack>
          <Stack mt={2} align="center">
            <Divider />
            <Text as="b">This is the Room for Adventure</Text>
            <Text>"{params.adventureId}"</Text>
            <Divider />
            <Text as="b">You have joined as user</Text>
            <Text>"{email}"</Text>
            <Divider />
          </Stack>
          <Stack direction={{ base: "column", sm: "row" }} justify="center">
            <Button
              colorScheme="blue"
              onClick={() => {
                navigate("/adventures");
              }}
            >
              Back to Adventures
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                publishMessage();
              }}
            >
              Publish Message
            </Button>
          </Stack>
          {messagePreviews}
        </Stack>
      </Container>
    </Box>
  );
};

export default Room;
