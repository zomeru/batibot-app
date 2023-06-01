import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { Fragment, useState } from 'react';

import { TextInput } from '~components/Input';
import { GPTResponse, UserPrompt } from '~components/index';
import { useAuth } from '~contexts/auth';
import { useAskGPT } from '~hooks/useAskGPT';

export default function HomeScreen() {
  const { user } = useAuth();

  const [defaultBottomPadding, setDefaultBottomPadding] = useState(0);

  const { conversationList, prompt, setPrompt, handleSendMessage } = useAskGPT(
    'old',
    5
  );

  return (
    <View className='relative flex items-center justify-center flex-1 w-screen h-full bg-primaryBackground'>
      <StatusBar style='light' />
      <View className='flex justify-between w-full h-full '>
        <View
          style={{
            paddingBottom: 78 + defaultBottomPadding,
          }}
          className={`h-auto`}
        >
          <ScrollView>
            {conversationList.map((convo, i) => (
              <Fragment key={i}>
                <UserPrompt
                  imageUrl={user?.user_metadata.avatar_url}
                  prompt={convo.prompt}
                />
                {convo.response && <GPTResponse response={convo.response} />}
              </Fragment>
            ))}
          </ScrollView>
        </View>

        <View className='absolute bottom-0 flex flex-col w-full pb-10 bg-primaryBackground'>
          <View className='h-[2px] w-full bg-secondaryBackground mb-2' />
          <TextInput
            placeholder='Type a message...'
            className='mx-4'
            multiline
            numberOfLines={4}
            iconName='send-sharp'
            showIcon
            onIconPress={handleSendMessage}
            onContentSizeChange={e => {
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
