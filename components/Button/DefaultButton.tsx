import { TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface DefaultButtonProps {
  title: string;
  className?: string;
  onPress?: () => void;
}

export default function DefaultButton({
  title,
  className,
  onPress,
}: DefaultButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} className={`w-full ${className ?? ''}`}>
      <LinearGradient
        colors={['#3eb7d1', '#78d3af']}
        start={{ x: 0.0, y: 1 }}
        end={{ x: 0.9, y: 1 }}
        className='rounded-sm'
      >
        <Text className='py-3 text-base font-medium text-center text-white text-primaryBackground'>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
