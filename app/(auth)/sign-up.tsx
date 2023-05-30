import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import { TextInput } from '../../components/Input';
import { DefaultButton } from '../../components/Button';
import { Link } from 'expo-router';

// import { Text, View } from '../../components/Themed';

export default function SignUpScreen() {
  const [seePassword, setSeePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View className='h-screen w-screen flex justify-center items-center px-10 bg-primaryBackground text-primaryText'>
      <StatusBar style='light' />
      <View className='w-full h-auto'>
        <Text className='text-center font-bold text-2xl text-primaryText mb'>
          Register
        </Text>
        <Text className='text-center text-secondaryText font-medium text-sm mb-3'>
          Log in to continue to Batibot
        </Text>
        <TextInput
          className='mb-3'
          placeholder='Email'
          value={email}
          setValue={setEmail}
        />
        <TextInput
          placeholder='Password'
          showIcon
          iconName={seePassword ? 'eye-outline' : 'eye-off-outline'}
          onIconPress={() => setSeePassword(val => !val)}
          value={password}
          setValue={setPassword}
        />
        <DefaultButton title='Log in' className='mt-3' />
        <Text className='text-center text-secondaryText font-medium text-sm my-3'>
          Already have an account?{' '}
          <Link className='text-primaryAccent' href='/auth'>
            Log in
          </Link>
        </Text>
        <View className='w-full my-8 relative'>
          <View className='w-full h-[1px] bg-primaryText' />
          <View className='absolute bg-primaryBackground left-[45%] -top-[12px]'>
            <Text className='px-2 py-[2px] text-primaryText'>OR</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
