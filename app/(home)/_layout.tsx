import { Text, TouchableOpacity, View } from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { FontAwesome, Feather, AntDesign } from '@expo/vector-icons';
import { useNavigation } from 'expo-router/src/useNavigation';
import { DrawerActions } from '@react-navigation/native';

import { supabase } from '~utils/supabase';
import { useAuth } from '~contexts/auth';
import { Drawer } from '~components/Drawer';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'home',
};

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <DrawerContentScrollView {...props}>
      <View className='w-full h-[40px] bg-secondaryBackground mb-3 flex justify-center items-center'>
        <Text className='text-secondaryText'>{user?.email}</Text>
      </View>
      <DrawerItemList {...props} />

      <View className='w-[90%] flex justify-end items-start mx-auto h-[500px]'>
        <TouchableOpacity
          className='flex flex-row items-center w-full px-1 py-2'
          onPress={handleLogout}
        >
          <AntDesign name='logout' size={22} color='#5e6980' />
          <Text className='ml-8 text-sm font-medium text-secondaryText'>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const MenuIcon = (props: { tintColor?: string }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className='p-2 ml-2'
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    >
      <Feather name='menu' size={24} color={props.tintColor} />
    </TouchableOpacity>
  );
};

export default function HomeLayoutNavigator() {
  return (
    <Drawer
      initialRouteName='home'
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1a1e24',
        },
        headerLeft: MenuIcon,
        headerTintColor: '#3eb7d1',
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: '400',
          fontSize: 16,
        },
        drawerStyle: {
          backgroundColor: '#1a1e24',
        },
        drawerActiveBackgroundColor: '#292b37',
        drawerActiveTintColor: '#3eb7d1',
        drawerInactiveBackgroundColor: 'transparent',
        drawerInactiveTintColor: '#5e6980',
      }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen
        name='home'
        options={{
          title: 'Home',
          headerTitle: 'New chat',
          drawerIcon: ({ color, size }) => (
            <FontAwesome name='home' size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='conversations'
        options={{
          title: 'Conversation History',
          headerTitle: 'History',
          drawerIcon: ({ color, size }) => (
            <Feather name='message-square' size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='settings'
        options={{
          title: 'Settings',
          headerTitle: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Feather name='settings' size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='[conversation]'
        options={{
          headerTitle: '',
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
    </Drawer>
  );
}
