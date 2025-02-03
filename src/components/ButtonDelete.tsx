import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';
import {Colors} from '@/theme/Variables';
import {mS} from '@/utils/functions';

interface PROPS {
  onPress: () => void;
  disabled?: boolean;
}

const ButtonDelete = ({onPress, disabled}: PROPS) => {
  const {Fonts, Images, Gutters, Layout, Colors} = useTheme();
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, Layout.center]}>
      <Images.svgIcon.deleteCircle width={mS(24.92)} height={mS(24.92)} />
    </TouchableOpacity>
  );
};

export default ButtonDelete;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: mS(40),
    height: mS(40),
    borderRadius: mS(10),
    shadowColor: Colors.blackPrimary_111111,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2.5,
    elevation: 3,
  },
});
