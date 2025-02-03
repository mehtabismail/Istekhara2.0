import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthNavigatorParamList} from 'types/navigation';
import {
  CongratulationsScreen,
  LoginScreen,
  OtpScreen,
  ResetPasswordEmailScreen,
  ResetPasswordNewPasswordScreen,
} from '@/screens';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator<AuthNavigatorParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="CongratulationsScreen"
        component={CongratulationsScreen}
      />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen
        name="ResetPasswordEmailScreen"
        component={ResetPasswordEmailScreen}
      />
      <Stack.Screen
        name="ResetPasswordNewPasswordScreen"
        component={ResetPasswordNewPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
