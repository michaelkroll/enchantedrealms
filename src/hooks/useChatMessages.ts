// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import * as mutations from "../graphql/mutations";
import * as subscriptions from '../graphql/subscriptions';
import { listChatMessages } from "../graphql/queries";

import { useEffect, useState } from "react";
import ChatMessage from "../data/ChatMessage";
import { Subscription } from "rxjs";

const useChatMessages = (roomId: string) => {

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState("");

  let updateSubscription:Subscription;

  const storeChatMessage = (chatMessage: ChatMessage) => {
    console.log("Create a new Chat Message: ", chatMessage);

    const graphqlClient = generateClient();
    graphqlClient
      .graphql({
        query: mutations.createChatMessage,
        variables: { input: chatMessage },
      })
      .then(() => {
      })
      .catch((error) => {
        console.log("Error: ", error);
        setError(error);
      });
  }

  const subscribeToChatMessageUpdates = () => {
    if (updateSubscription) {
      updateSubscription.unsubscribe();
    }
    const graphqlClient = generateClient();
    console.log("subscribe to chatmessages for room/adventure id: ", roomId);
    updateSubscription = graphqlClient.graphql({query: subscriptions.onCreateChatMessage})
    .subscribe({
      next: ({ data }) => handleNewChatMessageFromSubscription(data.onCreateChatMessage), 
      error: (error) => setError(error)
    });
  }

  const unsubscribeFromChatMessageUpdates= () => {
    if (updateSubscription) {
      updateSubscription.unsubscribe();
    }
  }

  const handleNewChatMessageFromSubscription = (subscriptionChatMessage: ChatMessage) => {
    console.log("chatMessage from Subscription: ", subscriptionChatMessage);
    setChatMessages(chatMessages => [...chatMessages, subscriptionChatMessage]);
  }

  useEffect(() => {
    const graphqlClient = generateClient();

    console.log("read chatmessages for room/adventure id: ", roomId );
    const filters = {
      filter: {
        or: [
          {
            roomId: {
              eq: roomId,
            },
          },
        ],
      },
    };

    graphqlClient
      .graphql({
        query: listChatMessages,
        variables: filters,
      })
      .then((response) => {
        const chatMessageList = response.data.listChatMessages.items;
        chatMessageList.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        setChatMessages(chatMessageList);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return {storeChatMessage, subscribeToChatMessageUpdates, unsubscribeFromChatMessageUpdates, chatMessages, error};
};

export default useChatMessages

