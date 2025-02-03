import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AttendanceScreen} from '@/screens';

const Stack = createNativeStackNavigator<any>();

const AttendanceNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} />
    </Stack.Navigator>
  );
};

export default AttendanceNavigator;

const styles = StyleSheet.create({});
