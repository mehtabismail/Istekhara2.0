import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';
import {mS} from '@/utils/functions';

interface PROPS {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}
const ButtonRectengular = ({title, onPress, disabled}: PROPS) => {
  const {Layout, Gutters, Colors, Fonts, Images} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        Layout.center,
        {
          padding: mS(12),
          minWidth: mS(108),
          backgroundColor: Colors.white,
          borderRadius: mS(10),
        },
      ]}>
      <Text style={[Fonts.OpenSans12_Bold_111111]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonRectengular;

const styles = StyleSheet.create({});
