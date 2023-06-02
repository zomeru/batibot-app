import { View, Platform } from 'react-native';
import React from 'react';
import SkeletonLoader from './SkeletonLoader';

const isAndroid = Platform.OS === 'android';

const MessagesLoader = () => {
  return (
    <View className='flex flex-col items-start px-5 mt-[145px] mb-8 space-y-3'>
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <View key={index}>
            <View className='flex flex-row space-x-3'>
              <SkeletonLoader
                height={40}
                width={40}
                style={{
                  borderRadius: 100,
                }}
              />
              <View className='mt-2 space-y-2'>
                <SkeletonLoader
                  height={15}
                  width={isAndroid ? 330 : 310}
                  style={{
                    borderRadius: 4,
                  }}
                />
                <SkeletonLoader
                  height={15}
                  width={isAndroid ? 330 : 310}
                  style={{
                    borderRadius: 4,
                  }}
                />
              </View>
            </View>
            <View className='mt-2 space-y-2'>
              <SkeletonLoader
                height={15}
                style={{
                  borderRadius: 5,
                }}
              />
              <SkeletonLoader
                height={15}
                style={{
                  borderRadius: 5,
                }}
              />
            </View>
            <View className='mt-3'>
              <SkeletonLoader
                height={100}
                style={{
                  borderRadius: 5,
                }}
              />
            </View>
          </View>
        ))}
    </View>
  );
};

export default MessagesLoader;
