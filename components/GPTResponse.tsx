import { Image, Text, View } from 'react-native';
import TypeWriter from 'react-native-typewriter';

interface UserPromptProps {
  response?: string;
  type?: 'old' | 'new';
}

export default function GPTResponse({ response, type }: UserPromptProps) {
  return (
    <View className='flex flex-row h-auto px-4 py-3 space-x-3 bg-secondaryBackground'>
      <Image
        className='w-7 h-7'
        source={{
          uri: 'https://i.imgur.com/5UUsyq8.png',
        }}
      />
      <View className='mt-1 mr-7'>
        {type === 'new' ? (
          <TypeWriter
            typing={1}
            initialDelay={0}
            maxDelay={20}
            minDelay={0}
            className='flex-shrink-1 text-promptText'
          >
            {response}
          </TypeWriter>
        ) : (
          <Text className='flex-shrink-1 text-promptText'>{response}</Text>
        )}
      </View>
    </View>
  );
}
