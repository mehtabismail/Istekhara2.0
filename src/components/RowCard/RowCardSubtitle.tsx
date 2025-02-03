import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';

interface PROPS {
  children: string;
}

const RowCardSubtitle = ({children}: PROPS) => {
  const {Gutters, Layout, Colors, Fonts, Images} = useTheme();
  return (
    <Text
      numberOfLines={2}
      style={[Fonts.OpenSans12_Regular_111111, {color: Colors.gray_A3A3A3}]}>
      {children}
    </Text>
  );
};

export default RowCardSubtitle;

const styles = StyleSheet.create({});
