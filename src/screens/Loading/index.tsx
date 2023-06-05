import { View, ActivityIndicator } from 'react-native';

const InitialLoadingScreen = () => {
  return (
    <View className="flex items-center justify-center w-screen h-screen bg-primaryBackground">
      <ActivityIndicator size="large" />
    </View>
  );
};

export default InitialLoadingScreen;
