import { Conversation } from '@src/components/index';
import { useGPT } from '@src/hooks/useGPT';
import { useDrawerStatus } from '@react-navigation/drawer';

export default function HomeScreen() {
  const { conversationList, prompt, setPrompt, handleSendMessage, gptTyping } =
    useGPT('new');

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
