import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';
import {mS} from '@/utils/functions';
import {Colors} from '@/theme/Variables';

interface PROPS {
  label: string;
  shiftTime: string;
  startTime: string;
  endTime: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const ShiftDetailChip = ({
  label,
  endTime,
  shiftTime,
  startTime,
  containerStyle,
}: PROPS) => {
  const {Layout, Gutters, Colors, Fonts} = useTheme();
  return (
    <View
      style={[
        Layout.rowHCenter,
        styles.shiftContainer,

        containerStyle,
        {flex: 7},
      ]}>
      <View style={[Gutters.littleHPadding, Layout.center, styles.shiftLabel]}>
        <Text
          style={[
            Fonts.OpenSans12_Bold_111111,
            Fonts.textCenter,
            {textTransform: 'capitalize'},
          ]}>
          {label ? label : 'Shift'}
        </Text>
      </View>
      <View
        style={[
          Gutters.littleLMargin,
          Gutters.littleRMargin,
          Layout.rowHCenter,
          Layout.fill,
        ]}>
        <Text
          numberOfLines={1}
          style={[
            Fonts.OpenSans11_Regular_707070,
            {textTransform: 'capitalize'},
          ]}>
          {shiftTime ? shiftTime : 'N/A'}
          {', '}
        </Text>
        <Text numberOfLines={1} style={[Fonts.OpenSans11_Regular_707070]}>
          {startTime} {' - '}
        </Text>
        <Text
          numberOfLines={1}
          style={[Fonts.OpenSans11_Regular_707070, Layout.fill]}>
          {endTime}
        </Text>
      </View>
    </View>
  );
};

export default ShiftDetailChip;

const styles = StyleSheet.create({
  shiftContainer: {
    height: mS(25),
    borderWidth: mS(1),
    borderColor: Colors.gray_DBDBDB,
    borderRadius: mS(30),
    alignSelf: 'flex-start',
  },
  shiftLabel: {
    backgroundColor: Colors.yellowPrimary_FFF0BF,
    borderRadius: mS(20),
    height: '100%',
  },
});
