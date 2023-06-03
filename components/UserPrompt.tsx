import { Image, Text, View } from 'react-native';

interface UserPromptProps {
  imageUrl: string;
  prompt?: string;
}

export default function UserPrompt({ imageUrl, prompt }: UserPromptProps) {
  return (
    <View className="flex flex-row h-auto px-4 py-3 space-x-3">
      <Image
        className="w-7 h-7"
        source={{
          uri:
            imageUrl ||
            'https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg',
        }}
      />
      <View className="mt-1 mr-7">
        <Text className="flex-shrink-1 text-promptText">{prompt}</Text>
      </View>
    </View>
  );
}
