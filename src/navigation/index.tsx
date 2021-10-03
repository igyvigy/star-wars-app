import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import DetailsScreen from '@screens/DetailsScreen';
import ListScreen from '@screens/ListScreen';
import SettingsScreen from '@screens/SettingsScreen';
import HomeScreen from 'src/screens/HomeScreen';

import {Palette} from '@style/colors';
import {FontAwesomeIcon} from '@style/icons';
import Kind from '@models/Kind';
import {Strings} from '@style/strings';

const Tab = createBottomTabNavigator();
const TabStack = createStackNavigator();

const Explore = () => {
  return (
    <TabStack.Navigator>
      <TabStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: true,

          headerLeft: () => null,
          title: Strings.explore,
          headerStyle: {
            backgroundColor: Palette.common.white,
          },
        }}
      />
    </TabStack.Navigator>
  );
};

const Settings = () => {
  return (
    <TabStack.Navigator>
      <TabStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerShown: true,
          title: Strings.settings,
          headerStyle: {
            backgroundColor: Palette.common.white,
          },
        }}
      />
    </TabStack.Navigator>
  );
};

const Icon = ({name, color, size}): JSX.Element => {
  switch (name) {
    case 'Explore':
      return <FontAwesomeIcon name="folder" color={color} size={size} />;
    case 'Settings':
      return <FontAwesomeIcon name="wrench" color={color} size={size} />;
    default:
      return <FontAwesomeIcon color={color} size={size} />;
  }
};

const TabsContainer = () => {
  const options = {
    headerShown: false,
  };
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          return <Icon name={route.name} color={color} size={size} />;
        },
      })}>
      <Tab.Screen name={'Explore'} component={Explore} options={options} />
      <Tab.Screen name={'Settings'} component={Settings} options={options} />
    </Tab.Navigator>
  );
};

export type RootStackParamList = {
  Root: {};
  HomeScreen: {};
  SettingsScreen: {};
  DetailsScreen: {kind: Kind; id: number} | {url: string};
  ListScreen:
    | {kind: Kind; title?: string}
    | {kind: Kind; urls: string[]; title?: string};
};

const RootStack = createStackNavigator<RootStackParamList>();

type RootProps = NativeStackScreenProps<RootStackParamList, 'Root'>;

export const RootScreen: React.FC<RootProps> = () => {
  return (
    <RootStack.Navigator initialRouteName="Root">
      <RootStack.Screen
        name="Root"
        component={TabsContainer}
        options={{
          title: Strings.root,
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="ListScreen"
        component={ListScreen}
        options={{
          headerShown: true,
          title: Strings.list,
          headerStyle: {
            backgroundColor: Palette.common.white,
          },
        }}
      />
      <RootStack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          headerShown: true,
          title: Strings.loading,
          headerStyle: {
            backgroundColor: Palette.common.white,
          },
        }}
      />
    </RootStack.Navigator>
  );
};

export default RootScreen;
