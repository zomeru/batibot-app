import { useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';

import { handleSupabaseResendOTP, supabase } from '~utils/supabase';
import { DefaultButton } from '~components/Button';
import { TextInput } from '~components/Input';

export default function VerifyEmailScreen() {
  const searchParams = useLocalSearchParams();
  const navigation = useNavigation();

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSending, setOtpSending] = useState(false);

  const handleVerifyEmail = async () => {
    if (!code) {
      Toast.show({
        type: 'warning',
        text1: 'Please enter the code we sent you.',
      });
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.verifyOtp({
      token: code.trim(),
      type: 'signup',
      email: searchParams.email as string,
    });

    if (error) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    }

    if (data) {
      Toast.show({
        type: 'success',
        text1: 'Email verified!',
      });
    }

    setLoading(false);
  };

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
        onPress={handleVerifyEmail}
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

      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text>Go back</Text>
      </TouchableOpacity>
    </View>
  );
}
