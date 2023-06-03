import { Configuration, OpenAIApi } from 'openai';

import Constants from 'expo-constants';

const createConfig = () => {
  const OPENAI_API_KEY = Constants.expoConfig?.extra?.OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    console.log('OPENAI_API_KEY is not set in .env file.');
  }

  return new Configuration({ apiKey: OPENAI_API_KEY });
};

export const openai = new OpenAIApi(createConfig());

type GPTCreateChatCompletionParams = {
  userPrompt: string;
  systemContent: string;
};

const gptCreateChatCompletion = async ({
  userPrompt,
  systemContent,
}: GPTCreateChatCompletionParams) => {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: systemContent,
      },
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  });

  if (response.data.choices.length <= 0 || !response.data.choices[0]?.message?.content) {
    return null;
  }

  return response?.data?.choices[0]?.message?.content;
};

export const generateTitle = async (prompt: string) => {
  const generatedTitle = await gptCreateChatCompletion({
    userPrompt: prompt,
    systemContent: `Please generate a title based on this prompt or question: "${prompt}". Make it straightforward and minimum of 2 words and maximum of 5 words.`,
  });

  if (!generatedTitle) {
    return 'Error generating title.';
  }

  return generatedTitle;
};

export const generateGPTResponse = async (prompt: string, recentMessages?: string) => {
  const gptResponse = await gptCreateChatCompletion({
    userPrompt: prompt,
    systemContent: `Respond to the user's messages as best, accurately, convincingly, and as human-like as you can, keep it short and straight to the point. Maximum of 5 sentences. You can make it long if the users asks for it. You can also add bullets and numbers in a list in addition to the 5 sentences, but add them only if the user asks for it. You can try to be funny sometimes. Also, if they ask if you know or who Zomer, Zomer Gregorio, or zomeru is (that's me by the way, who created this AI messaging app (Batibot, name of the app)), you can try to respond this message instead: "Zomer is a Software Engineer based in the Philippines and the creator of this app. You can check out his website at https://zomeru.com."${
      recentMessages
        ? ` Also, you can try to make your answer based on the user's recent messages and your response (as an assistant) to those recent messages (conversation history) if they did not get the answer they want and they ask again. Here are the recent messages of the user, the most recent or the last message is always number 1:\n\n${recentMessages}`
        : ''
    }`,
  });

  if (!gptResponse) {
    return 'Something went wrong on our end. Please try again.';
  }

  return gptResponse;
};
