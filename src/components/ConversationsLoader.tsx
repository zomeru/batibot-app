import { Platform, View } from 'react-native';
import React from 'react';
import SkeletonLoader from './SkeletonLoader';

const isAndroid = Platform.OS === 'android';

const ConversationsLoader = () => {
  return (
    <View className="flex flex-col items-start px-5 mb-8 space-y-3">
      {Array(isAndroid ? 20 : 14)
        .fill(null)
        .map((_, index) => (
          <SkeletonLoader
            key={index}
            height={40}
            style={{
              borderRadius: 5,
            }}
          />
        ))}
    </View>
  );
};

export default ConversationsLoader;
