import { Text, View, Image } from 'react-native';
import { ExternalLink } from '@src/components/index';

export default function AboutScreen() {
  return (
    <View className='flex items-center justify-center flex-1 w-screen h-screen px-10 bg-primaryBackground'>
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
        <View className='flex flex-row items-center mb-5 space-x-2'>
          <Text className='font-medium text-secondaryText'>Developed by: </Text>
          <ExternalLink
            href='https://github.com/zomeru'
            text='Zomeru'
            className='text-base text-info'
          />
        </View>

        <View className='flex flex-row space-x-5'>
          <ExternalLink
            href='https://github.com/zomeru/batibot-app'
            text='Contribute'
            className='text-info'
          />

          <ExternalLink
            href='https://ko-fi.com/zomeru#'
            text='Donate'
            className='text-[#ff47d7]'
          />
        </View>
      </View>
    </View>
  );
}
