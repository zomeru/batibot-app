import { useState } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';

import { resendOTP } from '@src/utils/supabase';
import { DefaultButton } from '@src/components/Button';
import { TextInput } from '@src/components/Input';
import { useAuthenticate } from '@src/hooks/useAuthenticate';
import { AuthProps } from '@src/navigators/AuthNavigator';

export default function VerifyEmailScreen({ route, navigation }: AuthProps) {
  const type = route.params?.type;
  const email = route.params?.email;
  const title = route.params?.title;

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSending, setOtpSending] = useState(false);

  const { handleVerifyOTP } = useAuthenticate();

  const showError = () => {
    Toast.show({
      type: 'error',
      text1: 'Something went wrong. Please try again later.',
    });
  };

  const handleResendOTP = async () => {
    if (!type || !email) {
      showError();
      return;
    }

    await resendOTP(email, setOtpSending, type);
  };

  return (
    <View className="flex items-center justify-center flex-1 w-screen h-screen px-10 bg-primaryBackground">
      <Text className="text-2xl font-bold text-center font-roboto text-primaryText">
        {title ? title : 'Verify Your Email'}
      </Text>
      <Text className="mb-5 text-sm font-medium text-center font-roboto text-secondaryText">
        {route.params?.message
          ? route.params?.message
          : 'Thank you for signing up! Please check your email and copy the OTP we sent you to verify your account.'}
      </Text>

      <TextInput
        placeholder="6-digit OTP"
        maxLength={6}
        keyboardType="number-pad"
        value={code}
        setValue={(text: string) => {
          const re = /^[0-9\b]+$/;
          if (text === '' || re.test(text)) {
            setCode(text);
          }
        }}
      />
      <DefaultButton
        onPress={async () => {
          if (!email || !type) {
            showError();
            return;
          }

          await handleVerifyOTP({
            code,
            setLoading,
            email,
            type,
          });
        }}
        title="Verify"
        loading={loading}
        disabled={loading}
        className="mt-5"
      />
      {otpSending ? (
        <ActivityIndicator className="my-[40px]" size="small" />
      ) : (
        <TouchableOpacity className="my-10" onPress={handleResendOTP}>
          <Text className="font-roboto text-secondaryText">Resend OTP</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Text className="font-roboto text-secondaryText">Go back</Text>
      </TouchableOpacity>
    </View>
  );
}
