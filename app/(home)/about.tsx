import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import { ExternalLink } from '~components/index';

export default function SettingsScreen() {
  return (
    <View className='flex items-center justify-center flex-1 w-screen h-screen px-10 bg-primaryBackground'>
      <StatusBar style='light' />
      <View className='flex items-center justify-center mb-16 space-y-2'>
        <Image
          className='w-32 h-32 opacity-80'
          source={{
            uri: 'https://i.imgur.com/qZLxVqM.png',
          }}
        />
        <Text className='text-4xl font-bold text-primaryText'>Batibot</Text>
        <Text className='mb-10 text-base font-bold text-center text-secondaryText'>
          Welcome to Batibot! An open-source AI powered messaging companion.
          Let's embark on a journey of knowledge and connection together.
        </Text>
        <Text className='mb-5 font-medium text-secondaryText'>
          Developed by:{' '}
          <ExternalLink href='https://github.com/zomeru'>
            <Text className='text-primaryAccent'>Zomeru</Text>
          </ExternalLink>
        </Text>

        <View className='flex flex-row space-x-5 '>
          <ExternalLink href='https://github.com/zomeru/batibot-app'>
            <Text className='font-medium text-primaryAccent'>Contribute</Text>
          </ExternalLink>
          <ExternalLink href='https://ko-fi.com/zomeru#'>
            <Text className='text-[#d645b4] font-medium'>Donate</Text>
          </ExternalLink>
        </View>
      </View>
    </View>
  );
}
