import { TouchableOpacity, Text, ActivityIndicator, StyleProp } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface DefaultButtonProps {
  title: string;
  className?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<any>;
}

export default function DefaultButton({
  title,
  className,
  onPress,
  disabled,
  loading,
  style,
}: DefaultButtonProps) {
  return (
    <TouchableOpacity
      style={style}
      disabled={disabled}
      onPress={onPress}
      className={`w-full ${className ?? ''}`}>
      <LinearGradient
        colors={['#3eb7d1', '#78d3af']}
        start={{ x: 0.0, y: 1 }}
        end={{ x: 0.9, y: 1 }}
        className="rounded-sm">
        {loading ? (
          <ActivityIndicator className="py-[14px]" color="black" size="small" />
        ) : (
          <Text className="py-3 text-base font-medium text-center text-white font-roboto text-primaryBackground">
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}
