import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

import { useAuth } from '@src/contexts/AuthProvider';
import {
  createConversation,
  createMessage,
  getConversation,
  getConversationMessages,
  updateConversation,
} from '@src/helpers/supabase';
import { generateGPTResponse, generateTitle } from '@src/utils/openai';
import { HOME_STACK } from '@src/navigators/HomeNavigator';

export type ConversationList = {
  id: number;
  prompt: string;
  response?: string;
};

export const useGPT = (type: 'new' | 'old', conversationId?: number) => {
  const navigation = useNavigation<NavigationProp<HOME_STACK>>();
  const { user } = useAuth();

  const [newConversationId, setNewConversationId] = useState<number | null>();
  const [prompt, setPrompt] = useState('');
  const [titleChanged, setTitleChanged] = useState(false);
  const [conversationList, setConversationList] = useState<ConversationList[]>([]);
  const [loading, setLoading] = useState(true);
  const [gptTyping, setGptTyping] = useState(false);
  const [originalConversationLength, setOriginalConversationLength] = useState(0);
  const [conversationTitle, setConversationTitle] = useState('');

  useEffect(() => {
    if (type === 'new' || !conversationId) return;
    let timer: NodeJS.Timeout;

    const fetchRecentPrompts = async () => {
      setLoading(true);
      const [conversation, conversationError] = await getConversation(conversationId);

      if (conversation) {
        navigation.setOptions({ headerTitle: conversation.title });
        setTitleChanged(true);
        setConversationTitle(conversation.title);
      }

      if (conversationError) {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong fetching your conversation.',
        });
        return;
      }

      const [messages] = await getConversationMessages(conversationId!);

      if (!messages) {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong fetching your conversation.',
        });
        return;
      }

      setConversationList(messages as ConversationList[]);
      setOriginalConversationLength((messages as ConversationList[]).length);
      timer = setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    fetchRecentPrompts().catch((error) => {
      console.error(error);
    });

    return () => {
      clearTimeout(timer);
    };
  }, [conversationId]);

  const handleSendMessage = async () => {
    setGptTyping(true);
    const newConversationList = [
      ...conversationList,
      {
        id: conversationList.length + 1,
        prompt,
      },
    ];
    setConversationList(newConversationList);
    setPrompt('');

    const formattedRecentMessages = conversationList
      .map((recent, i) => {
        const numbering = conversationList.length - i;

        return `${numbering}\n User prompt: "${recent.prompt}"\n Assistant response: "${recent.response}"\n`;
      })
      .join('\n');

    const gptResponse = await generateGPTResponse(prompt, formattedRecentMessages);

    if (gptResponse) {
      const newConversationListWithResponse = newConversationList.map((conversation, index) => {
        if (index === newConversationList.length - 1) {
          return {
            ...conversation,
            response: gptResponse,
          };
        }

        return conversation;
      });
      setGptTyping(false);
      setConversationList(newConversationListWithResponse);

      if (!titleChanged || conversationTitle === 'New chat') {
        const title = await generateTitle(prompt);
        setConversationTitle(title);
        navigation.setOptions({
          headerTitle: title,
        });
        navigation.setParams({
          title,
        });
        setTitleChanged(true);
        const [data] = await createConversation(title, user?.email!);
        setNewConversationId(data?.id);

        createMessage({
          prompt,
          response: gptResponse,
          conversationId: data.id || conversationId!,
          user: user?.email!,
        });
      } else {
        // Update the title even if it's still the same, so that the updated_at field is updated
        await updateConversation({
          conversationId: newConversationId ?? conversationId!,
          title: conversationTitle,
        });

        await createMessage({
          prompt,
          response: gptResponse,
          conversationId: newConversationId ?? conversationId!,
          user: user?.email!,
        });
      }
    }
  };

  return {
    conversationList,
    prompt,
    setPrompt,
    handleSendMessage,
    loading,
    originalConversationLength,
    gptTyping,
    setConversationList,
    setConversationTitle,
  };
};
