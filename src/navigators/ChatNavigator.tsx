import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CalendarDetails,
  AddUpdateClientScreen,
  AddUpdateVanueScreen,
  CalendarScreen,
  ChatScreen,
  ClientsScreen,
  EventsSettingScreen,
  VanuesListScreen,
} from '@/screens';

const Stack = createNativeStackNavigator<any>();

const ChatNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen
        name="EventsSettingScreen"
        component={EventsSettingScreen}
      />
      <Stack.Screen name="VanuesListScreen" component={VanuesListScreen} />
      <Stack.Screen name="ClientsScreen" component={ClientsScreen} />
      <Stack.Screen
        name="AddUpdateVanueScreen"
        component={AddUpdateVanueScreen}
      />
      <Stack.Screen
        name="AddUpdateClientScreen"
        component={AddUpdateClientScreen}
      />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="CalendarDetails" component={CalendarDetails} />
    </Stack.Navigator>
  );
};

export default ChatNavigator;

const styles = StyleSheet.create({});
