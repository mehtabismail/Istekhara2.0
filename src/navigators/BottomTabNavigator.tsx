import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeNavigator from './HomeNavigator';
import EventsNavigator from './EventsNavigator';
import UsersNavigator from './UsersNavigator';
import ChatNavigator from './ChatNavigator';
import {useTheme} from '@/hooks';
import MainHeader from '@/components/MainHeader';
import {useAppSelector} from '@/store';
import ShiftsNavigator from './ShiftsNavigator';
import AttendanceNavigator from './AttendanceNavigator';
import TabIcons from './_components/TabIcons';
import {mS} from '@/utils/functions';
import Loader from '@/components/Loader';
import useInitialAPIsCall from '@/hooks/useInitialAPIsCall';
import {io} from 'socket.io-client';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const {Colors, Layout} = useTheme();
  const {isLoading} = useInitialAPIsCall();
  const {user_type} = useAppSelector(state => state.auth);
  const [socket, setSocket] = useState<any>(null);

  console.log('sockect===>>', socket?.connected);

  const handleSocket = async () => {
    const newSocket = io(process.env.API_URL, {
      transports: ['websocket'],
    });
    newSocket.on('connect', () => {
      console.log('sockect is connected...');
    });
    setSocket(newSocket);
    // socket.emit('userID', { userId: id })
  };

  useEffect(() => {
    handleSocket();
    // const socket = io(process.env.API_URL + '2920');
    // console.log('socket==>>', socket);
    // return () => {
    //   socket.close();
    // };
  }, []);

  return (
    <View style={[Layout.fill]}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MainHeader />
          <Tab.Navigator
            screenOptions={({route}) => {
              return {
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarIcon: ({focused}) => (
                  <TabIcons route={route.name} focused={focused} />
                ),
                tabBarStyle: {
                  backgroundColor: Colors.blackPrimary_111111,
                  height: mS(82),
                  marginBottom: mS(-1),
                  borderTopColor: Colors.blackPrimary_111111,
                },
              };
            }}>
            <Tab.Screen
              name="HomeNavigator"
              component={HomeNavigator}
              options={{
                unmountOnBlur: true,
              }}
            />
            {user_type == 'manager' ? (
              <Tab.Screen
                name="EventsNavigator"
                component={EventsNavigator}
                options={{
                  unmountOnBlur: true,
                }}
              />
            ) : user_type == 'staff' ? (
              <Tab.Screen
                name="ShiftsNavigator"
                component={ShiftsNavigator}
                options={{
                  unmountOnBlur: true,
                }}
              />
            ) : null}
            {user_type == 'manager' ? (
              <Tab.Screen
                name="UsersNavigator"
                component={UsersNavigator}
                options={{
                  unmountOnBlur: true,
                }}
              />
            ) : user_type == 'staff' ? (
              <Tab.Screen
                name="AttendanceNavigator"
                component={AttendanceNavigator}
                options={{
                  unmountOnBlur: true,
                }}
              />
            ) : null}

            <Tab.Screen
              name="ChatNavigator"
              component={ChatNavigator}
              options={{
                unmountOnBlur: true,
              }}
            />
          </Tab.Navigator>
        </>
      )}
    </View>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
