import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';

interface ProviderButtonProps {
  provider: 'google' | 'discord';
  className?: string;
}

export default function ProviderButton({
  provider,
  className,
}: ProviderButtonProps) {
  return (
    <TouchableOpacity
      className={`w-full rounded-sm border border-primaryText border-[1px] flex flex-row items-center justify-center ${
        className ?? ''
      }`}
    >
      {provider === 'discord' ? (
        <FontAwesome5
          className='text-primaryText'
          name='discord'
          size={20}
          color='#fffcfc'
        />
      ) : (
        <Ionicons
          className='text-primaryText'
          name='logo-google'
          size={20}
          color='#fffcfc'
        />
      )}

      <Text className='text-white font-regular text-base px-3 text-primaryText py-3'>
        Continue with {provider === 'google' ? 'Google ' : 'Discord '}
      </Text>
    </TouchableOpacity>
  );
}
