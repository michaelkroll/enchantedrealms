// React imports
import { useEffect, useState } from "react";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";

import * as mutations from "../graphql/mutations";
import * as subscriptions from '../graphql/subscriptions';
import { listChatMessages } from "../graphql/queries";

// Custom imports
import ChatMessage from "../data/ChatMessage";
import { Subscription } from "rxjs";

const useChatMessages = (roomId: string) => {

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState("");

  let updateSubscription:Subscription;

  const storeChatMessage = (chatMessage: ChatMessage) => {
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
    setChatMessages(chatMessages => [subscriptionChatMessage, ...chatMessages]);
  }

  useEffect(() => {
    const graphqlClient = generateClient();
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
        chatMessageList.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        setChatMessages(chatMessageList);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return {storeChatMessage, subscribeToChatMessageUpdates, unsubscribeFromChatMessageUpdates, chatMessages, error};
};

export default useChatMessages