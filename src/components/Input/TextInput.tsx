import {
  View,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
  StyleProp,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

interface TextInputComponentProps {
  showIcon?: boolean;
  placeholder?: string;
  iconName?: typeof IonIcon.name;
  iconSize?: number;
  onIconPress?: () => void;
  iconColor?: string;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>> | ((text: string) => void);
  className?: string;
  secure?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  onContentSizeChange?: (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => void;
  style?: StyleProp<any>;
  onSubmitEditing?: () => void;
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
  style,
}: TextInputComponentProps) {
  return (
    <View
      style={style}
      className={`flex flex-row justify-center items-center bg-secondaryBackground px-3 rounded-sm ${
        className ?? ''
      }`}>
      <TextInput
        style={{}}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        autoFocus={false}
        keyboardType={keyboardType}
        secureTextEntry={iconName === 'eye-off-outline' || secure}
        className="flex flex-1 py-4 text-tertiaryText bg-secondaryBackground"
        value={value}
        placeholderTextColor="#5e6980"
        placeholder={placeholder}
        onChangeText={(val) => {
          if (setValue) setValue(val);
        }}
        onContentSizeChange={onContentSizeChange}
        underlineColorAndroid="transparent"
      />
      {showIcon && (
        <>
          {onIconPress ? (
            <TouchableOpacity className="px-2 py-3" onPress={onIconPress}>
              <IonIcon name={iconName} size={iconSize} color={iconColor || '#a0a7b8'} />
            </TouchableOpacity>
          ) : (
            <IonIcon
              style={{
                paddingLeft: 5,
              }}
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
