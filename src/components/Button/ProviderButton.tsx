import { TouchableOpacity, Text, StyleProp } from 'react-native';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ProviderButtonProps {
  provider: 'Google' | 'Discord' | 'Github';
  onPress?: () => void;
  className?: string;
  style?: StyleProp<any>;
}

export default function ProviderButton({
  provider,
  className,
  onPress,
  style,
}: ProviderButtonProps) {
  return (
    <TouchableOpacity
      style={style}
      className={`w-full rounded-sm border border-tertiaryText border-[1px] flex flex-row items-center justify-center ${
        className ?? ''
      }`}
      onPress={onPress}
    >
      {provider === 'Discord' ? (
        <MaterialCommunityIcon name='discord' size={20} color='#a0a7b8' />
      ) : provider === 'Google' ? (
        <AntDesignIcon name='google' size={20} color='#a0a7b8' />
      ) : (
        <AntDesignIcon name='github' size={20} color='#a0a7b8' />
      )}

      <Text className='px-3 py-3 text-base text-white font-regular text-tertiaryText'>
        Continue with {provider}
      </Text>
    </TouchableOpacity>
  );
}
