import { useLocalSearchParams } from 'expo-router';

import { useGPT } from '~hooks/useGPT';
import Conversation from '~components/Conversation';
import { View } from 'react-native';
import MessagesLoader from '~components/MessagesLoader';

export default function ConversationScreen() {
  const searchParams = useLocalSearchParams();

  const {
    conversationList,
    prompt,
    setPrompt,
    handleSendMessage,
    loading,
    originalConversationLength,
    gptTyping,
  } = useGPT('old', Number(searchParams.conversationId));

  return (
    <>
      {loading ? (
        <View className="flex items-center justify-center flex-1 w-screen h-full bg-primaryBackground">
          <MessagesLoader />
        </View>
      ) : (
        <Conversation
          conversationList={conversationList}
          prompt={prompt}
          setPrompt={setPrompt}
          handleSendMessage={handleSendMessage}
          type="old"
          originalConversationLength={originalConversationLength}
          gptTyping={gptTyping}
        />
      )}
    </>
  );
}
