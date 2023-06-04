import { View, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { useAuth } from '@src/contexts/AuthProvider';
import { ROOT_STACK, RootProps } from '@src/containers/Navigation';

const InitialLoadingScreen = ({ navigation }: RootProps) => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigation.navigate(ROOT_STACK.HOME);
    } else {
      navigation.navigate(ROOT_STACK.AUTH);
    }
  }, [user]);

  return (
    <View className='flex items-center justify-center w-screen h-screen bg-primaryBackground'>
      <ActivityIndicator size='large' />
    </View>
  );
};

export default InitialLoadingScreen;
