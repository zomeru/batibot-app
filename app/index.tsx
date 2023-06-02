import { View, ActivityIndicator } from 'react-native';
import React from 'react';

const InitialScreen = () => {
  return (
    <View className='flex items-center justify-center w-screen h-screen bg-primaryBackground'>
      <ActivityIndicator size='large' />
    </View>
  );
};

export default InitialScreen;
