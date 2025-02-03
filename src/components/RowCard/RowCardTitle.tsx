import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';

interface PROPS {
  children: string;
  size?: '18' | '15';
}
const RowCardTitle = ({children, size}: PROPS) => {
  const {Gutters, Layout, Colors, Fonts, Images} = useTheme();
  return (
    <Text
      numberOfLines={1}
      style={[
        size == '18'
          ? Fonts.OpenSans18_Bold_111111
          : Fonts.OpenSans15_Bold_111111,
        size == '18' && Gutters.smallLMargin,
        {textTransform: 'capitalize'},
      ]}>
      {children}
    </Text>
  );
};

export default RowCardTitle;

const styles = StyleSheet.create({});
