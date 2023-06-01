import {
  View,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface TextInputComponentProps {
  showIcon?: boolean;
  placeholder?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  onIconPress?: () => void;
  iconColor?: string;
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
  multiline?: boolean;
  numberOfLines?: number;
  onContentSizeChange?: (
    event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
  ) => void;
}

export default function TextInputComponent({
  showIcon = false,
  placeholder = 'Placeholder',
  iconName = 'checkmark-done-circle',
  iconSize = 20,
  onIconPress,
  iconColor,
  value,
  setValue,
  className,
  secure = false,
  keyboardType = 'default',
  maxLength,
  multiline = false,
  numberOfLines = 1,
  onContentSizeChange,
}: TextInputComponentProps) {
  return (
    <View
      className={`flex flex-row justify-center items-center bg-secondaryBackground px-3 rounded-sm ${
        className ?? ''
      }`}
    >
      <TextInput
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        autoFocus
        keyboardType={keyboardType}
        secureTextEntry={iconName === 'eye-off-outline' || secure}
        className='flex flex-1 py-4 text-tertiaryText bg-secondaryBackground'
        value={value}
        placeholderTextColor='#5e6980'
        placeholder={placeholder}
        onChangeText={val => {
          if (setValue) setValue(val);
        }}
        onContentSizeChange={onContentSizeChange}
        underlineColorAndroid='transparent'
      />
      {showIcon && (
        <>
          {onIconPress ? (
            <TouchableOpacity className='pl-1' onPress={onIconPress}>
              <Ionicons
                name={iconName}
                size={iconSize}
                color={iconColor || '#a0a7b8'}
              />
            </TouchableOpacity>
          ) : (
            <Ionicons
              className='pl-1'
              name={iconName}
              size={iconSize}
              color={iconColor || '#a0a7b8'}
            />
          )}
        </>
      )}
    </View>
  );
}
