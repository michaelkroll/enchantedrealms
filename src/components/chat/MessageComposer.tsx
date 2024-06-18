import { Flex, Input, Button, FormControl } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  handleSendMessage: (message: string) => void;
}

const MessageComposer = ({ handleSendMessage }: Props) => {
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    handleSendMessage(inputMessage);
    setInputMessage("");
  };

  return (
    <Flex w="100%" mt="5">
      <FormControl me={2} ms={6}>
        <Input
          variant="outline"
          placeholder="Message"
          value={inputMessage}
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
          onKeyDown={(keyEvent) => {
            if (keyEvent.code === "Enter" || keyEvent.defaultPrevented) {
              sendMessage();
            }
          }}
        />
      </FormControl>
      <Button
        me={10}
        colorScheme="blue"
        isDisabled={inputMessage.trim().length <= 0}
        onClick={() => sendMessage()}
      >
        Send
      </Button>
    </Flex>
  );
};

export default MessageComposer;
