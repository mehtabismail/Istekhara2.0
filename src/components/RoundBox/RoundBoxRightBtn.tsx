import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';
import {mS} from '@/utils/functions';

const RoundBoxRightBtn = ({
  rightBtnTitle,
  rightBtnContent,
  onRightBtnPress,
  rightBtnRadius,
  backgroundColor,
}) => {
  const {Layout, Gutters, Fonts} = useTheme();
  return (
    <TouchableOpacity
      disabled={!onRightBtnPress}
      activeOpacity={0.8}
      style={[
        Layout.center,
        Gutters.tinyPadding,
        {
          borderRadius: rightBtnRadius ? rightBtnRadius : 20,
          backgroundColor: backgroundColor,
          height: mS(45),
        },
      ]}
      onPress={onRightBtnPress}>
      <Text
        style={[
          Fonts.OpenSans12_Bold_111111,
          {textTransform: 'capitalize', color: 'white'},
        ]}>
        {rightBtnTitle}
      </Text>
      {rightBtnContent && (
        <Text
          numberOfLines={1}
          style={[Fonts.OpenSans12_Regular_111111, {color: 'white'}]}>
          {rightBtnContent}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default RoundBoxRightBtn;
