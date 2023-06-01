import { Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';

interface ProviderButtonProps {
  provider: 'Google' | 'Discord' | 'Github';
  onPress?: () => void;
  className?: string;
}

export default function ProviderButton({
  provider,
  className,
  onPress,
}: ProviderButtonProps) {
  return (
    <TouchableOpacity
      className={`w-full rounded-sm border border-tertiaryText border-[1px] flex flex-row items-center justify-center ${
        className ?? ''
      }`}
      onPress={onPress}
    >
      {provider === 'Discord' ? (
        <FontAwesome5 name='discord' size={20} color='#a0a7b8' />
      ) : provider === 'Google' ? (
        <Ionicons name='logo-google' size={20} color='#a0a7b8' />
      ) : (
        <AntDesign name='github' size={20} color='#a0a7b8' />
      )}

      <Text className='px-3 py-3 text-base text-white font-regular text-tertiaryText'>
        Continue with {provider}
      </Text>
    </TouchableOpacity>
  );
}
