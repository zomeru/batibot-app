import { StackScreenProps, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { AboutScreen, HomeScreen, ConversationScreen, HistoryScreen } from '@src/screens';
import CustomDrawerContent from './CustomDrawer';

export enum HOME_STACK {
  HOME = 'Home',
  CONVERSATION = 'Conversation',
  HISTORY = 'History',
  ABOUT = 'About',
}

type HomeParams =
  | {
      isNew?: boolean;
      conversationId?: number;
      title?: string;
    }
  | undefined;

export type HomeStackParamList = {
  [HOME_STACK.HOME]: HomeParams;
  [HOME_STACK.CONVERSATION]: Exclude<HomeParams, undefined>;
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
        headerRight: NewChatIcon,
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
      drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name={HOME_STACK.HOME}
        component={HomeScreen}
        options={{
          headerTitle: '',
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
  <FontAwesomeIcon name="home" size={props.size} color={props.color} />
);

const HistoryIcon = (props: IconProps) => (
  <FeatherIcon name="message-square" size={props.size} color={props.color} />
);

const AboutIcon = (props: IconProps) => (
  <FeatherIcon name="info" size={props.size} color={props.color} />
);

export const NewChatIcon = () => {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList>>();

  const isNew = route.params?.title === 'New chat';

  return (
    <TouchableOpacity
      disabled={isNew}
      className="mr-4"
      onPress={() => {
        navigation.navigate(HOME_STACK.HOME, {
          isNew: true,
        });
      }}>
      <EntypoIcon name="new-message" size={20} color={!isNew ? '#3eb7d1' : '#5e626d'} />
    </TouchableOpacity>
  );
};
