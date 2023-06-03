import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import Toast from 'react-native-toast-message';

import { DefaultButton, ProviderButton } from '~components/Button';
import { TextInput } from '~components/Input';
import { useAuthenticate } from '~hooks/useAuthenticate';
import { oAuthLogin } from '~utils/supabase';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const [seePassword, setSeePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { handleSignIn } = useAuthenticate();

  return (
    <View className="flex items-center justify-center flex-1 w-screen h-screen px-8 bg-primaryBackground">
      <StatusBar style="light" />
      <View className="w-full h-auto">
        <Image
          className="w-16 h-16 mx-auto opacity-80"
          source={{
            uri: 'https://i.imgur.com/qZLxVqM.png',
          }}
        />
        <Text className="text-2xl font-bold text-center text-primaryText">Welcome to Batibot!</Text>
        <Text className="mb-5 text-sm font-medium text-center text-secondaryText">
          Log in to continue to Batibot
        </Text>
        <TextInput className="mb-3" placeholder="Email" value={email} setValue={setEmail} />
        <TextInput
          placeholder="Password"
          showIcon
          iconName={seePassword ? 'eye-outline' : 'eye-off-outline'}
          onIconPress={() => setSeePassword((val) => !val)}
          value={password}
          setValue={setPassword}
        />
        <TouchableOpacity
          className="mt-3 mb-1"
          onPress={() => {
            Toast.show({
              type: 'info',
              text1: 'Coming soon!',
            });
          }}>
          <Text className="text-sm font-medium text-right text-secondaryText">
            Forgot password?
          </Text>
        </TouchableOpacity>
        <DefaultButton
          loading={loading}
          disabled={loading}
          title="Log in"
          className="mt-3"
          onPress={async () =>
            await handleSignIn({
              email,
              password,
              setLoading,
            })
          }
        />
        <Text className="my-5 text-sm font-medium text-center text-secondaryText">
          Don't have an account?{' '}
          <Link href="/sign-up">
            <Text className="text-primaryAccent">Sign up</Text>
          </Link>
        </Text>
        <View className="relative w-full mt-2 mb-8">
          <View className="w-full h-[1px] bg-tertiaryText" />
          <View className="absolute bg-primaryBackground left-[45%] -top-[10px]">
            <Text className="px-2 py-[2px] text-tertiaryText">OR</Text>
          </View>
        </View>

        <ProviderButton provider="Google" className="mb-3" onPress={() => oAuthLogin('google')} />
        <ProviderButton onPress={() => oAuthLogin('discord')} provider="Discord" className="mb-3" />
        <ProviderButton onPress={() => oAuthLogin('github')} provider="Github" />
      </View>
    </View>
  );
}
