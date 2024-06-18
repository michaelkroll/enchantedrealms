import {
  Avatar,
  Card,
  CardBody,
  Flex,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import ChatMessage from "../../data/ChatMessage";
import moment from "moment";
import { useEffect, useRef } from "react";

interface Props {
  chatMessages: ChatMessage[];
}

const Messages = ({ chatMessages }: Props) => {
  const div = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (div.current) {
      div.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  });

  return (
    <Flex
      ref={div}
      minHeight="100%"
      direction="column-reverse"
      scrollBehavior="smooth"
    >
      {chatMessages.map((chatMessage) => (
        <Card
          mb={1}
          width="100%"
          key={chatMessage.id}
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Tooltip label={chatMessage.owner} bg="gray.300" color="black">
            <Avatar name={chatMessage.owner} ml={5} mt={5} mb={5} />
          </Tooltip>
          <Stack width="100%">
            <CardBody width="100%">
              <Text width="100%">{chatMessage.message}</Text>
              <Text fontSize="xs" width="100%" color="gray" align="right">
                {moment(new Date(chatMessage.createdAt!)).fromNow()}
              </Text>
            </CardBody>
          </Stack>
        </Card>
      ))}
    </Flex>
  );
};

export default Messages;
