import { useNavigation, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import { DefaultButton } from '~components/Button';
import { getUserConversations } from '~services/supabase';
import { useAuth } from '~contexts/auth';
import { ConversationsLoader } from '~components/index';

interface ConversationsType {
  id: string;
  title: string;
  created_at: string;
}

export default function ConversationsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const navigation = useNavigation();

  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [myConversations, setMyConversations] = useState<ConversationsType[]>(
    []
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const unsubscribe = navigation.addListener('focus', async () => {
      const [conversations] = await getUserConversations(user?.email as string);
      setMyConversations(conversations as ConversationsType[]);

      timer = setTimeout(() => {
        setInitialLoading(false);
      }, 1000);
    });

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  return (
    <View className='flex items-center flex-1 w-screen h-screen bg-primaryBackground'>
      <StatusBar style='light' />
      {initialLoading && <ConversationsLoader />}

      {!initialLoading && myConversations.length > 0 && (
        <View className='w-full h-full px-3'>
          <ScrollView className='space-y-3'>
            {myConversations.map((convo, i) => {
              const formattedDate = new Date(convo.created_at).toLocaleString(
                'en-US',
                {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }
              );

              return (
                <TouchableOpacity
                  className='w-full rounded-md bg-secondaryBackground h-[40px] flex flex-row items-center justify-between px-3'
                  key={convo.id}
                  onPress={() =>
                    router.push({
                      pathname: '[conversation]',
                      params: {
                        conversationId: convo.id,
                      },
                    })
                  }
                >
                  <Text className='text-base text-secondaryText'>
                    {convo.title}
                  </Text>
                  <Text className='text-secondaryText'>{formattedDate}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
      {!initialLoading && myConversations.length < 1 && (
        <View className='flex items-center justify-center w-full h-full mb-6'>
          <Image
            className='w-20 h-20 opacity-60'
            source={{
              uri: 'https://i.imgur.com/qZLxVqM.png',
            }}
          />
          <Text className='my-1 text-lg text-secondaryText'>
            You have no conversations yet.
          </Text>
          <Text className='px-5 text-center text-secondaryText'>
            Start a new conversation by clicking the button below.
          </Text>
          <DefaultButton
            title='New chat'
            className='mt-10'
            onPress={() => router.push('/home')}
          />
        </View>
      )}
    </View>
  );
}
