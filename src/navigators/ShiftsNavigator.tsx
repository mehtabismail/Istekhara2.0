import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ShiftsDetailScreen, ShiftsScreen, TaskScreen} from '@/screens';

const Stack = createNativeStackNavigator<any>();

const ShiftsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="ShiftsScreen" component={ShiftsScreen} />
      <Stack.Screen name="ShiftsDetailScreen" component={ShiftsDetailScreen} />
      <Stack.Screen name="TaskScreen" component={TaskScreen} />
    </Stack.Navigator>
  );
};

export default ShiftsNavigator;

const styles = StyleSheet.create({});
