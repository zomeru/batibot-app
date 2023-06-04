import { Text, View } from 'react-native';
import { ToastConfigParams } from 'react-native-toast-message';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function CustomToast(props: ToastConfigParams<any>) {
  const { type, text1, text2 } = props;

  const newText1 = text1 && text1?.replace(/ /g, '');
  const newText2 = text2 && text2?.replace(/ /g, '');

  const text1Length = newText1 && newText1.length;
  const text2Length = newText2 && newText2.length;

  return (
    <View
      className={`flex flex-1 w-full h-[120px]  -translate-y-[50px] justify-end items-center py-1 ${
        text1 && text2 ? 'h-[100px]' : 'h-[80px]'
      } bg-[#292b37e1] border-b-2 border-tertiaryBackground ${
        (text1Length && text1Length > 40) || (text2Length && text2Length > 40) ? 'h-[100px]' : ''
      } ${text1Length && text1Length > 40 && text2Length && text2Length > 40 ? 'h-[135px]' : ''}`}>
      {type === 'success' ? (
        <AntDesignIcon
          style={{
            marginBottom: 5,
          }}
          name="checkcircleo"
          size={20}
          color="#78d3af"
        />
      ) : type === 'error' ? (
        <MaterialIcon
          style={{
            marginBottom: 5,
          }}
          name="error-outline"
          size={20}
          color="#ff4d4d"
        />
      ) : type === 'warning' ? (
        <AntDesignIcon
          style={{
            marginBottom: 5,
          }}
          name="warning"
          size={20}
          color="#ffaf40"
        />
      ) : (
        <AntDesignIcon
          style={{
            marginBottom: 5,
          }}
          name="infocirlceo"
          size={20}
          color="#3eb7d1"
        />
      )}

      {text1 && <Text className="px-3 text-center font-roboto text-primaryText">{text1}</Text>}
      {text2 && <Text className="px-3 text-center font-roboto text-primaryText">{text2}</Text>}
    </View>
  );
}
