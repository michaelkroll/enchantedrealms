import {
  Box,
  Button,
  Container,
  Divider,
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
import { useEffect } from "react";
import useAdventure from "../../hooks/useAdventure";

interface Props {
  email: string;
}

const Room = ({ email }: Props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const adventureId: string = params.adventureId!;

  const {
    storeChatMessage,
    subscribeToChatMessageUpdates,
    unsubscribeFromChatMessageUpdates,
    chatMessages,
    error,
  } = useChatMessages(adventureId);

  const { adventure, adventureError } = useAdventure(adventureId);

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
              {adventureError && <Text color="tomato">{error}</Text>}
              <Text as="b">This is the Room for Adventure</Text>
              <Text>{adventure?.name}</Text>
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
          {error && <Text color="tomato">{error}</Text>}
          <MessageComposer handleSendMessage={handleSendMessage} />
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Room;
