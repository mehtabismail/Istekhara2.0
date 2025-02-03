import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {useTheme} from '../hooks';
import {ApplicationStackParamList} from '../../@types/navigation';
import AuthNavigator from './AuthNavigator';
import SplashScreen from 'react-native-splash-screen';
import {useAppSelector} from '@/store';
import BottomTabNavigator from './BottomTabNavigator';
import CreatePinNavigator from './CreatePinNavigator';
import AppNavigator from './AppNavigator';

const Stack = createStackNavigator<ApplicationStackParamList>();

const ApplicationNavigator = () => {
  const {Layout, Colors} = useTheme();
  const {token, user} = useAppSelector(state => state.auth);
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <SafeAreaView
      style={[Layout.fill, {backgroundColor: Colors.blackPrimary_111111}]}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={Colors.blackPrimary_111111}
        />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {token ? (
            <Stack.Screen name="AppNavigator" component={AppNavigator} />
          ) : (
            <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default ApplicationNavigator;
