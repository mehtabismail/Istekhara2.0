import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';
import {mS} from '@/utils/functions';
import {Colors} from '@/theme/Variables';

interface PROPS {
  status: 'filled' | 'unfilled';
  containerStyle?: StyleProp<ViewStyle>;
}

const FillStatusChip = ({status, containerStyle}: PROPS) => {
  const {Gutters, Layout, Fonts} = useTheme();
  return (
    <View
      style={[
        styles.status,
        Gutters.littleRMargin,
        Layout.center,
        {
          backgroundColor:
            status == 'filled'
              ? Colors.blackPrimary_111111
              : Colors.gray_9D9D9D,
        },
        containerStyle,
      ]}>
      <Text style={[Fonts.OpenSans10_Bold_DBDBDB, {color: Colors.white}]}>
        {status == 'filled' ? 'Filled' : 'Unfilled'}
      </Text>
    </View>
  );
};

export default FillStatusChip;

const styles = StyleSheet.create({
  status: {
    height: mS(17),
    width: mS(70),
    backgroundColor: Colors.blackPrimary_111111,
    borderRadius: mS(17),
  },
});
