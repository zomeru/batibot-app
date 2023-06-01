import { Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';

interface ProviderButtonProps {
  provider: 'Google' | 'Discord' | 'Github';
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
      {provider === 'Discord' ? (
        <FontAwesome5
          className='text-primaryText'
          name='discord'
          size={20}
          color='#fffcfc'
        />
      ) : provider === 'Google' ? (
        <Ionicons
          className='text-primaryText'
          name='logo-google'
          size={20}
          color='#fffcfc'
        />
      ) : (
        <AntDesign
          className='text-primaryText'
          name='github'
          size={20}
          color='#fffcfc'
        />
      )}

      <Text className='px-3 py-3 text-base text-white font-regular text-primaryText'>
        Continue with {provider}
      </Text>
    </TouchableOpacity>
  );
}
