import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { TextInput } from '@src/components/Input';
import { DefaultButton, ProviderButton } from '@src/components/Button';
import { oAuthLogin } from '@src/utils/supabase';
import { useAuthenticate } from '@src/hooks/useAuthenticate';
import { AUTH_STACK, AuthProps } from '@src/navigators/AuthNavigator';

export default function SignUpScreen({ navigation }: AuthProps) {
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { handleSignUp } = useAuthenticate();

  return (
    <View className="flex items-center justify-center flex-1 w-screen h-screen px-8 bg-primaryBackground">
      <View className="w-full h-auto">
        <Text className="text-2xl font-bold text-center font-roboto text-primaryText">
          Create an Account
        </Text>
        <Text className="mb-5 text-sm font-medium text-center font-roboto text-secondaryText">
          Register to continue to Batibot
        </Text>
        <TextInput className="mb-3" placeholder="Email" value={email} setValue={setEmail} />
        <TextInput
          placeholder="Password"
          className="mb-3"
          showIcon
          iconName={seePassword ? 'eye-outline' : 'eye-off-outline'}
          onIconPress={() => setSeePassword((val) => !val)}
          value={password}
          setValue={setPassword}
        />
        <TextInput
          placeholder="Confirm Password"
          showIcon
          iconName={seeConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
          onIconPress={() => setSeeConfirmPassword((val) => !val)}
          value={confirmPassword}
          setValue={setConfirmPassword}
        />
        <DefaultButton
          loading={loading}
          disabled={loading}
          title="Sign up"
          className="mt-5"
          onPress={async () =>
            await handleSignUp({
              email,
              password,
              confirmPassword,
              setLoading,
            })
          }
        />
        <View className="flex flex-row items-center mx-auto my-5">
          <Text className="text-sm font-medium font-roboto text-secondaryText">
            Already have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(AUTH_STACK.SIGN_IN);
            }}>
            <Text className="font-roboto text-primaryAccent">Sign in</Text>
          </TouchableOpacity>
        </View>

        <View className="relative w-full mt-2 mb-8">
          <View className="w-full h-[1px] bg-tertiaryText" />
          <View className="absolute bg-primaryBackground left-[45%] -top-[10px]">
            <Text className="font-roboto px-2 py-[2px] text-tertiaryText">OR</Text>
          </View>
        </View>

        <ProviderButton
          provider="Google"
          className="mb-3"
          onPress={async () => oAuthLogin('google')}
        />
        <ProviderButton
          provider="Discord"
          className="mb-3"
          onPress={async () => oAuthLogin('discord')}
        />
        <ProviderButton provider="Github" onPress={async () => oAuthLogin('github')} />
      </View>
    </View>
  );
}
