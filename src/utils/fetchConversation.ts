import { getUserConversations } from '@src/helpers/supabase';
import Toast from 'react-native-toast-message';

type ConversationsType = {
  id: number;
  title: string;
  updated_at: string;
}[];

interface FetchMoreConversationParams {
  setFetching: React.Dispatch<React.SetStateAction<boolean>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  myConversations: ConversationsType;
  email: string;
  setMyConversations: React.Dispatch<React.SetStateAction<ConversationsType>>;
  setAtBottom: React.Dispatch<React.SetStateAction<boolean>>;
}

export const fetchMoreConversation = async ({
  setFetching,
  limit,
  setLimit,
  myConversations,
  email,
  setMyConversations,
  setAtBottom,
}: FetchMoreConversationParams) => {
  setFetching(true);
  const newLimit = limit + 20;
  const [newConversations] = await getUserConversations(email, newLimit);

  if ((newConversations as ConversationsType)?.length === myConversations.length) {
    Toast.show({
      type: 'info',
      text1: 'No more conversations',
    });
  } else {
    setMyConversations(newConversations as ConversationsType);
    setLimit(newLimit);
  }

  setFetching(false);
  setAtBottom(false);
};
