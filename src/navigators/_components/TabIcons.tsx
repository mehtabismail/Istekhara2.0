import {Platform, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';
import {mS} from '@/utils/functions';

interface PROPS {
  focused: boolean;
  route: string;
}

const TabIcons = ({focused, route}: PROPS) => {
  const {Colors, Layout, Images, Fonts} = useTheme();
  switch (route) {
    case 'HomeNavigator':
      return (
        <View
          style={[
            Layout.center,
            {
              height: mS(70),
              width: mS(70),
              marginBottom: Platform.OS == 'ios' ? mS(-20) : 0,
            },
          ]}>
          <Images.svgIcon.home
            width={mS(24)}
            height={mS(24)}
            color={focused ? Colors.yellowPrimary_FFF0BF : Colors.white}
          />
          <Text
            style={[
              Fonts.OpenSans10_Bold_DBDBDB,
              {
                color: focused ? Colors.yellowPrimary_FFF0BF : Colors.white,
                marginTop: mS(7),
              },
            ]}>
            HOME
          </Text>
        </View>
      );
    case 'EventsNavigator':
      return (
        <View
          style={[
            Layout.center,
            {
              height: mS(70),
              width: mS(70),
              marginBottom: Platform.OS == 'ios' ? mS(-20) : 0,
            },
          ]}>
          <Images.svgIcon.megaphone
            width={mS(24)}
            height={mS(24)}
            color={focused ? Colors.yellowPrimary_FFF0BF : Colors.white}
          />
          <Text
            style={[
              Fonts.OpenSans10_Bold_DBDBDB,
              {
                color: focused ? Colors.yellowPrimary_FFF0BF : Colors.white,
                marginTop: mS(7),
              },
            ]}>
            EVENTS
          </Text>
        </View>
      );
    case 'UsersNavigator':
      return (
        <View
          style={[
            Layout.center,
            {
              height: mS(70),
              width: mS(70),
              marginBottom: Platform.OS == 'ios' ? mS(-20) : 0,
            },
          ]}>
          <Images.svgIcon.users
            width={mS(24)}
            height={mS(24)}
            color={focused ? Colors.yellowPrimary_FFF0BF : Colors.white}
          />
          <Text
            style={[
              Fonts.OpenSans10_Bold_DBDBDB,
              {
                color: focused ? Colors.yellowPrimary_FFF0BF : Colors.white,
                marginTop: mS(7),
              },
            ]}>
            USERS
          </Text>
        </View>
      );
    case 'ChatNavigator':
      return (
        <View
          style={[
            Layout.center,
            {
              height: mS(70),
              width: mS(70),
              marginBottom: Platform.OS == 'ios' ? mS(-20) : 0,
            },
          ]}>
          <Images.svgIcon.comment
            width={mS(24)}
            height={mS(24)}
            color={focused ? Colors.yellowPrimary_FFF0BF : Colors.white}
          />
          <Text
            style={[
              Fonts.OpenSans10_Bold_DBDBDB,
              {
                color: focused ? Colors.yellowPrimary_FFF0BF : Colors.white,
                marginTop: mS(7),
              },
            ]}>
            CHAT
          </Text>
        </View>
      );
    case 'ShiftsNavigator':
      return (
        <View
          style={[
            Layout.center,
            {
              height: mS(70),
              width: mS(70),
              marginBottom: Platform.OS == 'ios' ? mS(-20) : 0,
            },
          ]}>
          <Images.svgIcon.workingHours
            width={mS(24)}
            height={mS(24)}
            color={focused ? Colors.yellowPrimary_FFF0BF : Colors.white}
          />
          <Text
            style={[
              Fonts.OpenSans10_Bold_DBDBDB,
              {
                color: focused ? Colors.yellowPrimary_FFF0BF : Colors.white,
                marginTop: mS(7),
              },
            ]}>
            MY SHIFTS
          </Text>
        </View>
      );
    case 'AttendanceNavigator':
      return (
        <View
          style={[
            Layout.center,
            {
              height: mS(70),
              width: mS(70),
              marginBottom: Platform.OS == 'ios' ? mS(-20) : 0,
            },
          ]}>
          <Images.svgIcon.attendence
            width={mS(24)}
            height={mS(24)}
            color={focused ? Colors.yellowPrimary_FFF0BF : Colors.white}
          />
          <Text
            style={[
              Fonts.OpenSans10_Bold_DBDBDB,
              {
                color: focused ? Colors.yellowPrimary_FFF0BF : Colors.white,
                marginTop: mS(7),
              },
            ]}>
            ATTENDANCE
          </Text>
        </View>
      );
    default:
      null;
  }
};

export default TabIcons;
