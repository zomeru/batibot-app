import { Conversation } from '~components/index';
import { useGPT } from '~hooks/useGPT';

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
