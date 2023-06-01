import { View, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TextInputComponentProps {
  showIcon?: boolean;
  placeholder?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  onIconPress?: () => void;
  iconColor?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  setValue?:
    | React.Dispatch<React.SetStateAction<string>>
    | ((text: string) => void);
  className?: string;
  secure?: boolean;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad';
  maxLength?: number;
}

export default function TextInputComponent({
  showIcon = false,
  placeholder = 'Placeholder',
  iconName = 'checkmark-done-circle',
  iconSize = 20,
  onIconPress,
  iconColor = '#1a1e24',
  value,
  setValue,
  className,
  secure = false,
  keyboardType = 'default',
  maxLength,
}: TextInputComponentProps) {
  return (
    <View
      className={`flex flex-row justify-center items-center bg-primaryText px-3 rounded-sm ${
        className ?? ''
      }`}
    >
      <TextInput
        maxLength={maxLength}
        autoFocus
        keyboardType={keyboardType}
        secureTextEntry={iconName === 'eye-off-outline' || secure}
        className='flex flex-1 py-4 text-primaryBackground bg-primaryText'
        value={value}
        placeholderTextColor='#a9aab6'
        placeholder={placeholder}
        onChangeText={val => {
          if (setValue) setValue(val);
        }}
        underlineColorAndroid='transparent'
      />
      {showIcon && (
        <>
          {onIconPress ? (
            <Pressable onPress={onIconPress}>
              <Ionicons
                className='text-primaryText'
                name={iconName}
                size={iconSize}
                color={iconColor}
              />
            </Pressable>
          ) : (
            <Ionicons
              className='text-primaryText'
              name={iconName}
              size={iconSize}
              color={iconColor}
            />
          )}
        </>
      )}
    </View>
  );
}
