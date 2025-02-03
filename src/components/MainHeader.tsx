import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import {logoutApp, mS} from '@/utils/functions';
import {useTheme} from '@/hooks';
import {Colors} from '@/theme/Variables';
import BottomSheetComponent, {sheetTypes} from './BottomSheetComponent';
import SheetRowContent from './SheetRowContent';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@/store';
import ConfimationModal, {modalTypes} from './ConfimationModal';

const MainHeader = () => {
  const {Layout, Fonts, Images, Gutters} = useTheme();
  const sheetRef = useRef<sheetTypes>(null);
  const modalRef = useRef<modalTypes>(null);
  const {navigate} = useNavigation();
  const {user, user_type} = useAppSelector(state => state.auth);

  return (
    <View style={[styles.BG, Layout.rowBetweenCenter, Gutters.smallHPadding]}>
      <View style={[Layout.rowHCenter, Layout.fill]}>
        <Text numberOfLines={1} style={[Fonts.OpenSans25_Bold_white]}>
          {user?.first_name} {user?.last_name}
        </Text>
        <Images.svgIcon.hand width={mS(30)} height={mS(24)} />
      </View>
      <View style={[Layout.row]}>
        <TouchableOpacity style={[styles.iconView, Gutters.littleRMargin]}>
          <Images.svgIcon.notificationBell width={mS(14.5)} height={mS(16)} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => sheetRef.current?.show()}
          style={[styles.iconView]}>
          <Images.svgIcon.dotsHrzntl width={mS(13)} height={mS(3.5)} />
        </TouchableOpacity>
      </View>
      <BottomSheetComponent ref={sheetRef}>
        <View style={[Gutters.xRegularHPadding, Gutters.xSmallTPadding]}>
          <Text
            style={[
              Fonts.OpenSans20_Bold_111111,
              Fonts.textCenter,
              Gutters.littleBMargin,
            ]}>
            {user_type == 'staff' ? 'Menu' : 'Settings'}
          </Text>
          {user_type == 'staff' ? (
            <>
              <SheetRowContent
                iconSize={mS(27)}
                Icon={Images.svgIcon.accountSetting}
                title="Account Settings"
                onPress={() => console.log('first')}
              />
              <SheetRowContent
                iconSize={mS(27)}
                Icon={Images.svgIcon.myShift}
                title="My Shift"
                onPress={() => console.log('first')}
              />
              <SheetRowContent
                iconSize={mS(27)}
                Icon={Images.svgIcon.calendarAttendence}
                title="Attendance"
                onPress={() => console.log('first')}
              />
              <SheetRowContent
                iconSize={mS(27)}
                Icon={Images.svgIcon.notificationBellOutline}
                title="Notifications"
                onPress={() => console.log('first')}
              />
            </>
          ) : (
            <>
              <SheetRowContent
                iconSize={mS(25)}
                Icon={Images.svgIcon.infoCircle}
                title="Requests"
                onPress={() => console.log('first')}
              />
              <SheetRowContent
                iconSize={mS(25)}
                Icon={Images.svgIcon.activityGraph}
                title="Activity Logs"
                onPress={() => console.log('first')}
              />
              <SheetRowContent
                iconSize={mS(25)}
                Icon={Images.svgIcon.userProfile}
                title="Profile"
                onPress={() => console.log('first')}
              />
              <SheetRowContent
                iconSize={mS(25)}
                Icon={Images.svgIcon.eventCalendar}
                title="Event Settings"
                onPress={() => {
                  sheetRef.current?.hide();
                  navigate('EventsSettingScreen' as never);
                }}
              />
            </>
          )}

          <SheetRowContent
            onPress={() => {
              sheetRef.current?.hide();
              setTimeout(() => {
                modalRef.current?.show();
              }, 350);
            }}
            iconWidth={mS(30)}
            iconHeight={mS(25)}
            Icon={Images.svgIcon.logout}
            title="Logout"
          />
        </View>
      </BottomSheetComponent>
      <ConfimationModal
        BtnOnePress={() => {
          modalRef.current?.hide();
          logoutApp();
        }}
        BtnTwoPress={() => modalRef.current?.hide()}
        title="Logout"
        ref={modalRef}>
        <Text
          style={[
            Fonts.OpenSans14_Regular_DBDBDB,
            Fonts.textCenter,
            {color: Colors.blackPrimary_111111},
          ]}>
          Are you sure you want to logout?
        </Text>
      </ConfimationModal>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  BG: {
    width: '100%',
    height: mS(93),
    backgroundColor: Colors.blackPrimary_111111,
  },
  iconView: {
    height: mS(35),
    width: mS(35),
    borderRadius: mS(35) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.yellowPrimary_FFF0BF,
    overflow: 'hidden',
  },
});
