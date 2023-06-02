import { useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

import { handleSupabaseResendOTP } from '~utils/supabase';
import { DefaultButton } from '~components/Button';
import { TextInput } from '~components/Input';
import { useAuthenticate } from '~hooks/useAuthenticate';

export default function VerifyEmailScreen() {
  const searchParams = useLocalSearchParams();
  const navigation = useNavigation();

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSending, setOtpSending] = useState(false);

  const { handleVerifyEmail } = useAuthenticate();

  const handleResendOTP = async () => {
    await handleSupabaseResendOTP(searchParams.email as string, setOtpSending);
  };

  return (
    <View className='flex items-center justify-center flex-1 w-screen h-screen px-10 bg-primaryBackground'>
      <StatusBar style='light' />
      <Text className='text-2xl font-bold text-center text-primaryText'>
        Verify Your Email
      </Text>
      <Text className='mb-5 text-sm font-medium text-center text-secondaryText'>
        {searchParams.message
          ? searchParams.message
          : 'Thank you for signing up! Please check your email and copy the OTP we sent you to verify your account.'}
      </Text>

      <TextInput
        placeholder='6-digit OTP'
        maxLength={6}
        keyboardType='number-pad'
        value={code}
        setValue={(text: string) => {
          const re = /^[0-9\b]+$/;
          if (text === '' || re.test(text)) {
            setCode(text);
          }
        }}
      />
      <DefaultButton
        onPress={async () =>
          await handleVerifyEmail({
            code,
            setLoading,
            email: searchParams.email as string,
          })
        }
        title='Verify'
        loading={loading}
        disabled={loading}
        className='mt-5'
      />
      {otpSending ? (
        <ActivityIndicator className='my-[40px]' size='small' />
      ) : (
        <TouchableOpacity className='my-10' onPress={handleResendOTP}>
          <Text className='text-secondaryText'>Resend OTP</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
