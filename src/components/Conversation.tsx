import { Image, ScrollView, Text, View } from 'react-native';
import { Fragment, useRef, useState } from 'react';

import { TextInput } from './Input';
import { useAuth } from '@src/contexts/AuthProvider';
import { type ConversationList } from '@src/hooks/';
import GPTResponse, { type ConversationType } from './GPTResponse';
import UserPrompt from './UserPrompt';

interface ConversationProps {
  conversationList: ConversationList[];
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => Promise<void>;
  gptTyping: boolean;
  originalConversationLength?: number;
  type?: ConversationType;
}

function Conversation({
  conversationList,
  prompt,
  setPrompt,
  handleSendMessage,
  type = 'new',
  originalConversationLength,
  gptTyping,
}: ConversationProps) {
  const { user } = useAuth();

  const scrollViewRef = useRef<ScrollView>(null);

  const [defaultBottomPadding, setDefaultBottomPadding] = useState(0);

  const sendPrompt = () => {
    if (!gptTyping && prompt.length > 0) {
      handleSendMessage();
    }
  };

  return (
    <View className="relative flex items-center justify-center flex-1 w-screen h-full bg-primaryBackground">
      <View className="flex justify-between w-full h-full ">
        <View
          style={{
            paddingBottom: 30 + defaultBottomPadding,
          }}
          className={`h-full`}>
          {conversationList.length > 0 ? (
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
              {conversationList.map((convo, i) => (
                <Fragment key={convo.id}>
                  <UserPrompt imageUrl={user?.user_metadata?.avatar_url} prompt={convo.prompt} />
                  <GPTResponse
                    type={
                      originalConversationLength && originalConversationLength < i + 1
                        ? 'new'
                        : type
                    }
                    response={convo.response}
                    gptTyping={gptTyping}
                  />
                </Fragment>
              ))}
            </ScrollView>
          ) : (
            <View className="flex items-center justify-center h-full">
              <Image
                className="w-20 h-20 opacity-80"
                source={{
                  uri: 'https://i.imgur.com/qZLxVqM.png',
                }}
              />
              <Text className="my-1 text-lg font-roboto text-secondaryText">
                Welcome to Batibot!
              </Text>
              <Text className="px-5 text-center font-roboto text-secondaryText">
                Your AI powered messaging companion. Let's embark on a journey of knowledge and
                connection together.
              </Text>
            </View>
          )}
        </View>

        <View className="absolute bottom-0 flex flex-col w-full pb-5 bg-primaryBackground">
          <View className="h-[2px] w-full bg-secondaryBackground mb-2" />
          <TextInput
            placeholder="Type a message..."
            className="h-auto mx-4"
            multiline
            iconName="send-sharp"
            showIcon
            onIconPress={sendPrompt}
            onContentSizeChange={(e) => {
              setDefaultBottomPadding(e.nativeEvent.contentSize.height);
            }}
            value={prompt}
            setValue={setPrompt}
          />
        </View>
      </View>
    </View>
  );
}

export default Conversation;
