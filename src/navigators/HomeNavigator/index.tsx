import { StackScreenProps, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {
  AboutScreen,
  HomeScreen,
  ConversationScreen,
  HistoryScreen,
} from '@src/screens';
import CustomDrawerContent from './CustomDrawer';

export enum HOME_STACK {
  HOME = 'Home',
  CONVERSATION = 'Conversation',
  HISTORY = 'History',
  ABOUT = 'About',
}

export type HomeStackParamList = {
  [HOME_STACK.HOME]: undefined;
  [HOME_STACK.CONVERSATION]: {
    conversationId: number;
  };
  [HOME_STACK.HISTORY]: undefined;
  [HOME_STACK.ABOUT]: undefined;
};

export type HomeProps = StackScreenProps<HomeStackParamList, HOME_STACK>;

const Drawer = createDrawerNavigator<HomeStackParamList>();

export default function AuthNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1a1e24',
        },
        headerTitleAlign: 'center',
        headerTintColor: '#3eb7d1',
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: '400',
          fontSize: 16,
        },
        drawerStyle: {
          backgroundColor: '#1a1e24',
        },
        drawerContentStyle: {
          paddingTop: 20,
        },
        drawerActiveBackgroundColor: '#292b37',
        drawerActiveTintColor: '#3eb7d1',
        drawerInactiveBackgroundColor: 'transparent',
        drawerInactiveTintColor: '#5e6980',
      }}
      initialRouteName={HOME_STACK.HOME}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen
        name={HOME_STACK.HOME}
        component={HomeScreen}
        options={{
          headerTitle: 'New Chat',
          drawerIcon: HomeIcon,
        }}
      />
      <Drawer.Screen
        name={HOME_STACK.HISTORY}
        component={HistoryScreen}
        options={{
          headerTitle: 'Conversation History',
          drawerIcon: HistoryIcon,
        }}
      />
      <Drawer.Screen
        name={HOME_STACK.ABOUT}
        component={AboutScreen}
        options={{
          headerTitle: 'About',
          drawerIcon: AboutIcon,
        }}
      />
      <Drawer.Screen
        name={HOME_STACK.CONVERSATION}
        component={ConversationScreen}
        options={{
          headerTitle: '',
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
    </Drawer.Navigator>
  );
}

type IconProps = {
  color: string;
  size: number;
  focused: boolean;
};

const HomeIcon = (props: IconProps) => (
  <FontAwesomeIcon name='home' size={props.size} color={props.color} />
);

const HistoryIcon = (props: IconProps) => (
  <FeatherIcon name='message-square' size={props.size} color={props.color} />
);

const AboutIcon = (props: IconProps) => (
  <FeatherIcon name='info' size={props.size} color={props.color} />
);
