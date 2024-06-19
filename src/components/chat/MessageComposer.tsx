import { Flex, Input, Button, FormControl } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface Props {
  handleSendMessage: (message: string) => void;
}

const MessageComposer = ({ handleSendMessage }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    handleSendMessage(inputMessage);
    setInputMessage("");
  };

  useEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <Flex w="100%" mt="5">
      <FormControl me={2} ms={6}>
        <Input
          ref={inputRef}
          variant="outline"
          placeholder="Message"
          value={inputMessage}
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
          onKeyDown={(keyEvent) => {
            if (
              keyEvent.code === "Enter" ||
              keyEvent.code === "NumpadEnter" ||
              keyEvent.defaultPrevented
            ) {
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
