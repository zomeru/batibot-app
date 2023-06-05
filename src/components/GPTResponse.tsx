import { Image, Text, View } from 'react-native';
import TypeWriter from 'react-native-typewriter';
import JumpingDots from './JumpingDots';
import FormattedText from './FormattedText';
import FormattedGPTResponse from './FormattedGPTResponse';

export type ConversationType = 'old' | 'new';

interface UserPromptProps {
  response?: string;
  gptTyping: boolean;
  type?: ConversationType;
}

export default function GPTResponse({ response, type, gptTyping }: UserPromptProps) {
  return (
    <View className="flex flex-row h-auto px-4 py-3 space-x-3 bg-secondaryBackground">
      <Image
        className="w-7 h-7"
        source={{
          uri: 'https://i.imgur.com/qZLxVqM.png',
        }}
      />
      <View className="mt-1 mr-7">
        {gptTyping && !response && (
          <View className="mt-1">
            <JumpingDots />
          </View>
        )}
        {response && (
          <>
            {type === 'new' ? (
              <FormattedGPTResponse text={response} />
            ) : (
              <FormattedText text={response} />
            )}
          </>
        )}
      </View>
    </View>
  );
}
