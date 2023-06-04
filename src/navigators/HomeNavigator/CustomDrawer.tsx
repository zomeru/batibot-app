import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { supabase } from '@src/utils/supabase';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { useAuth } from '@src/contexts/AuthProvider';
import { Text, TouchableOpacity, View } from 'react-native';
import { isAndroid } from '@src/constants';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
      <View>
        <View
          className={`w-full h-[40px] bg-secondaryBackground mb-3 flex justify-center items-center ${
            isAndroid ? 'mt-5' : ''
          }`}>
          <Text className="font-roboto text-secondaryText">{user?.email}</Text>
        </View>
        <DrawerItemList {...props} />
      </View>

      <View
        className={`w-[90%] flex justify-end items-start mx-auto ${isAndroid ? 'mb-10' : 'mb-16'}`}>
        <TouchableOpacity
          className="flex flex-row items-center w-full px-1 py-3"
          onPress={handleLogout}>
          <AntDesignIcon name="logout" size={22} color="#5e6980" />
          <Text className="ml-8 text-sm font-medium font-roboto text-secondaryText">Log out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
