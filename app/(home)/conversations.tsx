import { useNavigation, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  NativeScrollEvent,
  ActivityIndicator,
} from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { NativeSyntheticEvent } from 'react-native';
import Toast from 'react-native-toast-message';

import { DefaultButton } from '~components/Button';
import { getUserConversations } from '~services/supabase';
import { useAuth } from '~contexts/auth';
import { ConversationsLoader } from '~components/index';
import { useScrollViewFetch } from '~hooks/useScrollFetch';
import { fetchMoreConversation } from '~utils/fetchConversation';

type ConversationsType = {
  id: string;
  title: string;
  updated_at: string;
}[];

export default function ConversationsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const navigation = useNavigation();

  const scrollViewRef = useRef<ScrollView>(null);

  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [myConversations, setMyConversations] = useState<ConversationsType>([]);
  const [limit, setLimit] = useState(20);
  const [fetching, setFetching] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const [atTop, setAtTop] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const { handleScrollToPosition } = useScrollViewFetch();

  const fetchConversations = useCallback(async () => {
    const [conversations] = await getUserConversations(
      user?.email as string,
      limit
    );
    setMyConversations(conversations as ConversationsType);
  }, [limit]);

  useEffect(() => {
    if (initialLoading) {
      fetchConversations();
    }

    const unsubscribe = navigation.addListener('focus', fetchConversations);

    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, [fetchConversations, initialLoading]);

  const handleScrollFetch = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    handleScrollToPosition({
      nativeEvent,
      fetching,
      isScrolling,
      setAtBottom,
      setAtTop,
      bottomScrollCallback: async () => {
        await fetchMoreConversation({
          email: user?.email as string,
          limit,
          setMyConversations,
          setFetching,
          setLimit,
          myConversations,
          setAtBottom,
        });
      },
      topScrollCallback: async () => {
        const [conversations] = await getUserConversations(
          user?.email as string,
          20
        );
        setMyConversations(conversations as ConversationsType);
        setAtTop(false);
        if (conversations) {
          Toast.show({
            type: 'success',
            text1: 'Refreshed',
            visibilityTime: 1000,
          });
        }
      },
    });
  };

  return (
    <View className='flex items-center flex-1 w-screen h-screen bg-primaryBackground'>
      <StatusBar style='light' />
      {initialLoading && <ConversationsLoader />}

      {!initialLoading && myConversations.length > 0 && (
        <View className='w-full h-full px-3 pb-10'>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() => {
              if (!isScrolling) {
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }
            }}
            scrollEventThrottle={16}
            className='space-y-3'
            onScroll={handleScrollFetch}
            onTouchStart={() => setIsScrolling(true)}
            onTouchEnd={() => setIsScrolling(false)}
          >
            {atTop && (
              <View className='space-y-1'>
                <ActivityIndicator size='small' />
                <Text className='text-center text-secondaryText'>
                  {!fetching ? 'Release to refresh' : 'Refreshing...'}
                </Text>
              </View>
            )}
            {myConversations.map((conversation, i) => {
              // format date 01-01-2021
              const formattedDate = new Date(conversation.updated_at)
                .toLocaleDateString('en-US', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                })
                .replace(/\//g, '-');

              return (
                <TouchableOpacity
                  className='w-full rounded-md bg-secondaryBackground h-[40px] flex flex-row items-center justify-between px-3'
                  key={conversation.title + conversation.id}
                  onPress={() =>
                    router.push({
                      pathname: '[conversation]',
                      params: {
                        conversationId: conversation.id,
                      },
                    })
                  }
                >
                  <Text className='text-sm text-secondaryText'>
                    {conversation.title}
                  </Text>
                  <Text className='text-xs text-secondaryText'>
                    {formattedDate}
                  </Text>
                </TouchableOpacity>
              );
            })}
            {atBottom && (
              <View className='space-y-1'>
                <ActivityIndicator size='small' />
                <Text className='text-center text-secondaryText'>
                  {!fetching ? 'Release to load more' : 'Loading...'}
                </Text>
              </View>
            )}
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
          <View className='w-full px-20'>
            <DefaultButton
              title='New chat'
              className='mt-10'
              onPress={() => router.push('/home')}
            />
          </View>
        </View>
      )}
    </View>
  );
}
