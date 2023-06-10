import { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { DefaultButton } from '@src/components/Button';
import { TextInput } from '@src/components/Input';
import { useAuthenticate } from '@src/hooks/useAuthenticate';
import { AuthProps } from '@src/navigators/AuthNavigator';

export default function ForgotPassword({ navigation }: AuthProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { handleForgotPassword } = useAuthenticate();

  const handleSendRestPasswordOTP = async () => {
    handleForgotPassword({
      email: email.trim(),
      setLoading,
    });
  };

  return (
    <View className="flex items-center justify-center flex-1 w-screen h-screen px-10 bg-primaryBackground">
      <Text className="text-2xl font-bold text-center font-roboto text-primaryText">
        Log in using OTP
      </Text>
      <Text className="mb-5 text-sm font-medium text-center font-roboto text-secondaryText">
        Please enter your email address. We will send you an OTP to log in your account.
      </Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        setValue={(text: string) => {
          setEmail(text);
        }}
      />
      <DefaultButton
        onPress={handleSendRestPasswordOTP}
        title="Send OTP"
        loading={loading}
        disabled={loading}
        className="mt-5"
      />

      <TouchableOpacity
        className="my-10"
        onPress={() => {
          navigation.goBack();
        }}>
        <Text className="font-roboto text-secondaryText">Go back</Text>
      </TouchableOpacity>
    </View>
  );
}
