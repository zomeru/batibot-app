import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { Fragment, useState } from 'react';

import { TextInput } from '~components/Input';
import { GPTResponse, UserPrompt } from '~components/index';
import { useAuth } from '~contexts/auth';
import { generateGPTResponse, generateTitle } from '~utils/openai';

type ConversationList = {
  prompt: string;
  response?: string;
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [prompt, setPrompt] = useState('');
  const [titleChanged, setTitleChanged] = useState(false);
  const [defaultBottomPadding, setDefaultBottomPadding] = useState(0);
  const [conversationList, setConversationList] = useState<ConversationList[]>(
    []
  );

  const handleMessage = async () => {
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
      }
    }
  };

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
            onIconPress={handleMessage}
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
