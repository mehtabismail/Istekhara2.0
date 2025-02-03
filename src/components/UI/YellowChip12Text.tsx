import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';
import {mS} from '@/utils/functions';

interface PROPS {
  children: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const YellowChip12Text = ({children, containerStyle}: PROPS) => {
  const {Layout, Gutters, Colors, Fonts, Images} = useTheme();
  return (
    <View
      style={[
        {
          paddingVertical: mS(7),
          paddingHorizontal: mS(15),
          backgroundColor: Colors.yellowLite_FFFAEA,
          alignSelf: 'flex-start',
          borderRadius: mS(30),
        },
        containerStyle,
      ]}>
      <Text style={[Fonts.OpenSans12_Regular_111111]}>{children}</Text>
    </View>
  );
};

export default YellowChip12Text;

const styles = StyleSheet.create({});
