import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CalendarDetails,
  AddUpdateClientScreen,
  AddUpdateVanueScreen,
  CalendarScreen,
  ClientsScreen,
  EventsScreen,
  EventsSettingScreen,
  VanuesListScreen,
  AddEventScreen,
  EventDetailScreen,
  ShiftsListScreen,
  UpdateEventScreen,
  AddNewShiftScreen,
  TeamsListScreen,
  TeamDetailsScreen,
  AddTaskScreen,
  AddNewTeamScreen,
} from '@/screens';

const Stack = createNativeStackNavigator<any>();

const EventsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="EventsScreen" component={EventsScreen} />
      <Stack.Screen name="AddEventScreen" component={AddEventScreen} />
      <Stack.Screen name="EventDetailScreen" component={EventDetailScreen} />
      <Stack.Screen name="ShiftsListScreen" component={ShiftsListScreen} />
      <Stack.Screen name="UpdateEventScreen" component={UpdateEventScreen} />
      <Stack.Screen name="AddNewShiftScreen" component={AddNewShiftScreen} />
      <Stack.Screen name="TeamsListScreen" component={TeamsListScreen} />
      <Stack.Screen name="TeamDetailsScreen" component={TeamDetailsScreen} />
      <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
      <Stack.Screen name="VanuesListScreen" component={VanuesListScreen} />
      <Stack.Screen name="ClientsScreen" component={ClientsScreen} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="CalendarDetails" component={CalendarDetails} />
      <Stack.Screen name="AddNewTeamScreen" component={AddNewTeamScreen} />
      <Stack.Screen
        name="EventsSettingScreen"
        component={EventsSettingScreen}
      />
      <Stack.Screen
        name="AddUpdateVanueScreen"
        component={AddUpdateVanueScreen}
      />
      <Stack.Screen
        name="AddUpdateClientScreen"
        component={AddUpdateClientScreen}
      />
    </Stack.Navigator>
  );
};

export default EventsNavigator;

const styles = StyleSheet.create({});
