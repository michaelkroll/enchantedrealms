import {
  Avatar,
  Card,
  CardBody,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import ChatMessage from "../../data/ChatMessage";
import moment from "moment";

interface Props {
  chatMessages: ChatMessage[];
}

const Messages = ({ chatMessages }: Props) => {
  return (
    <SimpleGrid columns={1} spacing={2} width="100%">
      {chatMessages.map((chatMessage) => (
        <Card
          width="100%"
          key={chatMessage.id}
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Tooltip label={chatMessage.owner} bg="gray.300" color="black">
            <Avatar
              name={chatMessage.owner}
              ml={5}
              mt={5}
              mb={5}
            />
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
    </SimpleGrid>
  );
};

export default Messages;
