import {Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';

interface PROPS {
  paddingHorizontal?: number;
  bgColor?: string;
  children: any;
}

const AuthScreenBackground = ({
  paddingHorizontal,
  bgColor,
  children,
}: PROPS) => {
  const {Colors, Layout} = useTheme();
  return (
    <Pressable
      onPress={() => Keyboard.dismiss()}
      style={[
        Layout.fill,
        {
          paddingHorizontal: paddingHorizontal,
          backgroundColor: bgColor ? bgColor : Colors.blackPrimary_111111,
        },
      ]}>
      {children}
    </Pressable>
  );
};

export default AuthScreenBackground;

const styles = StyleSheet.create({});
