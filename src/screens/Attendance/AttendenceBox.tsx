import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';
import {mS} from '@/utils/functions';
import RoundBoxTitle from '@/components/RoundBox/RoundBoxTitle';

const AttendenceBox = ({hideBorder, title, Content, onPress}: any) => {
  const {Gutters, Layout, Colors, Images, Fonts} = useTheme();
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        Layout.rowHCenter,
        {
          marginHorizontal: mS(10),
          marginVertical: mS(5),
          backgroundColor: Colors.white,
          borderColor: Colors.gray_F2F2F2,
          borderWidth: hideBorder ? 0 : mS(1.5),
          borderRadius: mS(25),
        },
      ]}>
      <View
        style={[
          Layout.fill,
          Layout.row,
          Layout.center,
          Layout.justifyContentBetween,
        ]}>
        <View
          style={[
            {
              width: '65%',
              paddingHorizontal: mS(15),
              paddingVertical: hideBorder ? mS(5) : mS(20),
            },
          ]}>
          {!!title && <RoundBoxTitle>{title}</RoundBoxTitle>}
          <Content />
        </View>
        <View
          style={[
            {
              position: 'absolute',
              top: 0,
              right: 0,
              width: '35%',
              height: '100%',
            },
          ]}>
          <View
            style={[
              Layout.center,
              {
                height: '50%',
                backgroundColor: Colors.yellowLite_FFFAEA,
                borderTopRightRadius: 20,
              },
            ]}>
            <View style={[Layout.center]}>
              <Text
                style={[
                  Fonts.OpenSans15_Bold_111111,
                  {color: Colors.gray_2F2F2F},
                ]}>
                Clock In
              </Text>
              <Text
                style={[
                  Fonts.OpenSans12_Regular_111111,
                  {color: Colors.gray_2F2F2F},
                ]}>
                1pm
              </Text>
            </View>
          </View>
          <View
            style={[
              Layout.center,
              {
                height: '50%',
                backgroundColor: Colors.gray_EDEDED,
                borderBottomRightRadius: 20,
              },
            ]}>
            <View style={[Layout.center]}>
              <Text
                style={[
                  Fonts.OpenSans15_Bold_111111,
                  {color: Colors.gray_2F2F2F},
                ]}>
                Clock Out
              </Text>
              <Text
                style={[
                  Fonts.OpenSans12_Regular_111111,
                  {color: Colors.gray_2F2F2F},
                ]}>
                1pm
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AttendenceBox;
