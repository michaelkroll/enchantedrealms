import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { useNavigate, useParams } from "react-router-dom";
import useChatMessages from "../../hooks/useChatMessages";
import MessageComposer from "../chat/MessageComposer";
import Messages from "../chat/Messages";

// Custom imports
import { v4 as uuid } from "uuid";
import { useEffect, useRef } from "react";

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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const roomId: string = params.adventureId!;

  const {
    storeChatMessage,
    chatMessages,
    subscribeToChatMessageUpdates,
    unsubscribeFromChatMessageUpdates,
  } = useChatMessages(roomId);

  const handleSendMessage = (message: string) => {
    const newChatMessage = {
      id: uuid(),
      owner: email!,
      roomId: params.adventureId!,
      message: message!,
    };
    storeChatMessage(newChatMessage);
  };

  const enterRoom = () => {
    subscribeToChatMessageUpdates();
  };

  const leaveRoom = () => {
    unsubscribeFromChatMessageUpdates();
    navigate("/adventures");
    console.log("leave Room");
  };

  useEffect(() => {
    enterRoom();
  }, []);

  return (
    <>
      <Box>
        <Container>
          <Stack>
            <Stack mt={2} align="center">
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
                  leaveRoom();
                }}
              >
                Back to Adventures
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  onOpen();
                }}
              >
                Open Chat
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior="inside"
        size="full"
      >
        <ModalOverlay />
        <ModalContent height="100%">
          <ModalHeader>Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Messages chatMessages={chatMessages} />
          </ModalBody>
          <MessageComposer handleSendMessage={handleSendMessage} />
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Room;
