import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { DefaultButton, ProviderButton } from '@src/components/Button';
import { TextInput } from '@src/components/Input';
import { useAuthenticate } from '@src/hooks/useAuthenticate';
import { oAuthLogin } from '@src/utils/supabase';

import { AUTH_STACK, AuthProps } from '@src/navigators/AuthNavigator';

export default function SignInScreen({ navigation }: AuthProps) {
  const [seePassword, setSeePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { handleSignIn } = useAuthenticate();

  return (
    <View className="flex items-center justify-center flex-1 w-screen h-screen px-8 bg-primaryBackground">
      <View className="w-full h-auto">
        <Image
          className="w-16 h-16 mx-auto opacity-80"
          source={{
            uri: 'https://i.imgur.com/qZLxVqM.png',
          }}
        />
        <Text className="text-2xl font-bold text-center text-primaryText font-roboto">
          Welcome to Batibot!
        </Text>
        <Text className="mb-5 text-sm font-medium text-center font-roboto text-secondaryText">
          Log in to continue to Batibot
        </Text>
        <TextInput
          className="mb-3 font-roboto"
          placeholder="Email"
          value={email}
          setValue={setEmail}
        />
        <TextInput
          placeholder="Password"
          showIcon
          iconName={seePassword ? 'eye-outline' : 'eye-off-outline'}
          onIconPress={() => setSeePassword((val) => !val)}
          value={password}
          setValue={setPassword}
        />
        <TouchableOpacity
          className="mt-4 mb-1"
          onPress={() => {
            navigation.navigate(AUTH_STACK.FORGOT_PASSWORD);
          }}>
          <Text className="text-sm font-medium text-right font-roboto text-secondaryText">
            Forgot password?
          </Text>
        </TouchableOpacity>
        <DefaultButton
          loading={loading}
          disabled={loading}
          title="Log in"
          className="mt-3"
          onPress={async () => {
            await handleSignIn({
              email,
              password,
              setLoading,
            });
          }}
        />
        <View className="flex flex-row items-center mx-auto my-5">
          <Text className="text-sm font-medium font-roboto text-secondaryText">
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(AUTH_STACK.SIGN_UP);
            }}>
            <Text className="font-roboto text-primaryAccent">Sign up</Text>
          </TouchableOpacity>
        </View>

        <View className="relative w-full mt-2 mb-8">
          <View className="w-full h-[1px] bg-tertiaryText" />
          <View className="absolute bg-primaryBackground left-[45%] -top-[10px]">
            <Text className="font-roboto px-2 py-[2px] text-tertiaryText">OR</Text>
          </View>
        </View>

        <ProviderButton provider="Google" className="mb-3" onPress={() => oAuthLogin('google')} />
        <ProviderButton onPress={() => oAuthLogin('discord')} provider="Discord" className="mb-3" />
        <ProviderButton onPress={() => oAuthLogin('github')} provider="Github" />
      </View>
    </View>
  );
}
