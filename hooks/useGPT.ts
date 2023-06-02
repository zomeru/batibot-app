import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';

import { useAuth } from '~contexts/auth';
import {
  createConversation,
  createMessage,
  getConversation,
  getConversationMessages,
} from '~services/supabase';
import { generateGPTResponse, generateTitle } from '~utils/openai';

export type ConversationList = {
  prompt: string;
  response?: string;
};

export const useGPT = (type: 'new' | 'old', conversationId?: number) => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [newConversationId, setNewConversationId] = useState<number | null>();
  const [prompt, setPrompt] = useState('');
  const [titleChanged, setTitleChanged] = useState(false);
  const [conversationList, setConversationList] = useState<ConversationList[]>(
    []
  );

  useEffect(() => {
    if (type === 'new') return;

    const fetchRecentPrompts = async () => {
      const [conversation] = await getConversation(conversationId!);

      if (conversation) {
        navigation.setOptions({ headerTitle: conversation.title });
        setTitleChanged(true);
      }

      const [messages] = await getConversationMessages(conversationId!);

      if (!messages) return;

      setConversationList(messages as ConversationList[]);
    };

    fetchRecentPrompts().catch(error => {
      console.error(error);
    });
  }, []);

  const handleSendMessage = async () => {
    const newConversationList = [
      ...conversationList,
      {
        prompt,
      },
    ];
    setConversationList(newConversationList);
    setPrompt('');

    const gptResponse = await generateGPTResponse(prompt);

    if (gptResponse) {
      const newConversationListWithResponse = [
        ...newConversationList.slice(0, -1),
        {
          prompt,
          response: gptResponse,
        },
      ];
      setConversationList(newConversationListWithResponse);

      if (!titleChanged) {
        const title = await generateTitle(prompt);
        navigation.setOptions({
          headerTitle: title,
        });
        setTitleChanged(true);
        const [data] = await createConversation(title!, user?.email!);
        setNewConversationId(data?.id);

        await createMessage({
          prompt,
          response: gptResponse,
          conversationId: data.id || conversationId!,
          user: user?.email!,
        });
      } else {
        await createMessage({
          prompt,
          response: gptResponse,
          conversationId: newConversationId || conversationId!,
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
  };
};
