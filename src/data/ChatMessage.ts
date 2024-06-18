interface ChatMessage {
  id: string;
  owner: string;
  roomId: string;
  message: string;
  createdAt?: string;
}

export default ChatMessage;