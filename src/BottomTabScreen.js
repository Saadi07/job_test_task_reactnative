/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ContextApiScreen from './ContextApiScreen';
import MobxScreen from './MobxScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let label;

          if (route.name === 'Context Api') {
            label = 'Context Api';
          } else if (route.name === 'Mobx') {
            label = 'Mobx';
          }

          return (
            <Text
              style={{color: '#fff', fontWeight: focused ? 'bold' : 'normal'}}>
              {label}
            </Text>
          );
        },
        //tabBarActiveTintColor: 'tomato',
        tabBarActiveBackgroundColor: '#3c8',
        tabBarInactiveBackgroundColor: '#3c8',
        // tabBarInactiveTintColor: 'grey',
        tabBarShowLabel: false,
        headerShown: false,
      })}>
      <Tab.Screen name="Context Api" component={ContextApiScreen} />
      <Tab.Screen name="Mobx" component={MobxScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
