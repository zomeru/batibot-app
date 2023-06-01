import { Text, View } from 'react-native';
import { ToastConfig, ToastConfigParams } from 'react-native-toast-message';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export default function CustomToast(props: ToastConfigParams<ToastConfig>) {
  const { type, text1, text2 } = props;

  return (
    <View
      className={`flex flex-1 w-full h-[120px] bg-[#3eb6d12f] -translate-y-[50px] justify-end items-center py-1 ${
        text2 ? 'h-[130px]' : 'h-[110px]'
      }`}
    >
      {type === 'success' ? (
        <AntDesign
          className='text-primaryText mb-[5px]'
          name='checkcircleo'
          size={20}
          color='#78d3af'
        />
      ) : type === 'error' ? (
        <MaterialIcons
          className='mb-[5px]'
          name='error-outline'
          size={20}
          color='#ff4d4d'
        />
      ) : type === 'warning' ? (
        <AntDesign
          className='text-primaryText'
          name='warning'
          size={20}
          color='#ffaf40'
        />
      ) : (
        <AntDesign
          className='text-primaryText'
          name='infocirlceo'
          size={20}
          color='#3eb7d1'
        />
      )}

      {text1 && <Text className='text-primaryText'>{text1}</Text>}
      {text2 && <Text className='text-primaryText'>{text2}</Text>}
    </View>
  );
}
