import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';

interface PROPS {
  title: string;
  titleColor?: string;
  Icon: any;
  iconSize?: number;
  iconWidth?: number;
  iconHeight?: number;
  iconColor?: any;
  onPress: () => void;
}

const SheetRowContent = ({
  Icon,
  iconColor,
  iconHeight,
  iconSize,
  iconWidth,
  title,
  titleColor,
  onPress,
}: PROPS) => {
  const {Layout, Colors, Fonts, Images, Gutters} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[Layout.rowHCenter, Gutters.xLittleVMargin]}>
      <Icon
        color={iconColor || Colors.blackPrimary_111111}
        width={iconSize ? iconSize : iconWidth ? iconWidth : undefined}
        height={iconSize ? iconSize : iconHeight ? iconHeight : undefined}
      />
      <Text
        style={[
          Fonts.OpenSans16_SemiBold_111111,
          Gutters.xSmallLMargin,
          titleColor && {color: titleColor},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SheetRowContent;

const styles = StyleSheet.create({});
