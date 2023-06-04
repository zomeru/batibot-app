import { View } from 'react-native';

import { useGPT } from '@src/hooks/useGPT';
import { Conversation } from '@src/components';
import MessagesLoader from '@src/components/MessagesLoader';
import { HomeProps } from '@src/navigators/HomeNavigator';

export default function ConversationScreen({ route }: HomeProps) {
  const {
    conversationList,
    prompt,
    setPrompt,
    handleSendMessage,
    loading,
    originalConversationLength,
    gptTyping,
  } = useGPT('old', Number(route.params?.conversationId));

  return (
    <>
      {loading ? (
        <View className='flex items-center justify-center flex-1 w-screen h-full bg-primaryBackground'>
          <MessagesLoader />
        </View>
      ) : (
        <Conversation
          conversationList={conversationList}
          prompt={prompt}
          setPrompt={setPrompt}
          handleSendMessage={handleSendMessage}
          type='old'
          originalConversationLength={originalConversationLength}
          gptTyping={gptTyping}
        />
      )}
    </>
  );
}
