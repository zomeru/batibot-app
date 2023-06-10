import { useState } from 'react';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { DefaultButton } from '@src/components/Button';
import { TextInput } from '@src/components/Input';
import { updateUser } from '@src/helpers/supabase';

export default function Settings() {
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Password and confirm password do not match.',
      });
      return;
    }

    setLoading(true);

    const [data, error] = await updateUser({ password });

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong. Please try again.',
      });
    }

    if (data) {
      Toast.show({
        type: 'success',
        text1: 'Password updated successfully.',
      });

      setPassword('');
      setConfirmPassword('');
      setSeePassword(false);
      setSeeConfirmPassword(false);
    }

    setLoading(false);
  };

  return (
    <View className="flex flex-1 w-screen h-screen px-4 bg-primaryBackground">
      <Text className="mb-3 text-sm font-medium font-roboto text-secondaryText">
        Update your password.
      </Text>

      <TextInput
        className="mb-3"
        placeholder="New password"
        showIcon
        iconName={seePassword ? 'eye-outline' : 'eye-off-outline'}
        onIconPress={() => setSeePassword((val) => !val)}
        value={password}
        setValue={(text: string) => {
          setPassword(text);
        }}
      />
      <TextInput
        showIcon
        onIconPress={() => setSeeConfirmPassword((val) => !val)}
        iconName={seeConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
        placeholder="Confirm new password"
        value={confirmPassword}
        setValue={(text: string) => {
          setConfirmPassword(text);
        }}
      />
      <DefaultButton
        onPress={handleUpdatePassword}
        title="Reset password"
        loading={loading}
        disabled={loading}
        className="mt-5"
      />
    </View>
  );
}
