import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CongratulationsScreen,
  CreatePinScreen,
  LoginWithPinScreen,
  LoginWithTempPin,
  ResetPinEmailScreen,
} from '@/screens';
import {useAppSelector} from '@/store';

const CreatePinNavigator = ({}) => {
  const Stack = createNativeStackNavigator();
  const {is_password_change} = useAppSelector(state => state.auth);

  return (
    <Stack.Navigator
      initialRouteName={
        is_password_change ? 'LoginWithPinScreen' : 'CreatePinScreen'
      }
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="LoginWithPinScreen" component={LoginWithPinScreen} />
      <Stack.Screen name="LoginWithTempPin" component={LoginWithTempPin} />
      <Stack.Screen name="CreatePinScreen" component={CreatePinScreen} />
      <Stack.Screen
        name="CongratulationsScreen"
        component={CongratulationsScreen}
      />
      <Stack.Screen
        name="ResetPinEmailScreen"
        component={ResetPinEmailScreen}
      />
    </Stack.Navigator>
  );
};

export default CreatePinNavigator;

const styles = StyleSheet.create({});
