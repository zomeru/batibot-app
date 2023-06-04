import { CommonActions } from '@react-navigation/routers';
import { Conversation } from '@src/components/index';
import { useGPT } from '@src/hooks/useGPT';

import { HomeProps } from '@src/navigators/HomeNavigator';
import { useEffect } from 'react';

export default function HomeScreen({ route, navigation }: HomeProps) {
  const {
    conversationList,
    prompt,
    setPrompt,
    handleSendMessage,
    gptTyping,
    setConversationList,
    setConversationTitle,
  } = useGPT('new');

  useEffect(() => {
    if (route?.params?.isNew) {
      navigation.dispatch(CommonActions.setParams({ isNew: false }));

      setConversationList([]);
      setConversationTitle('New chat');
    }

    if (route?.params?.isNew || !route?.params?.title) {
      navigation.setOptions({ headerTitle: 'New chat' });
      navigation.setParams({
        title: 'New chat',
      });
    }
  }, [route?.params]);

  return (
    <Conversation
      conversationList={conversationList}
      prompt={prompt}
      setPrompt={setPrompt}
      handleSendMessage={handleSendMessage}
      gptTyping={gptTyping}
    />
  );
}
