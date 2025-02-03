import {StyleProp, StyleSheet, Text, View, ViewProps} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';
import {SpacingTypes, spacingValues} from '../constants';

interface PROPS {
  head: string;
  detail?: string;
  fill?: boolean;
  containerStyle?: StyleProp<ViewProps>;
}

const Text14_HeadAndDetail = ({detail, head, fill, containerStyle}: PROPS) => {
  const {Layout, Gutters, Colors, Fonts, Images} = useTheme();

  return (
    <View style={[fill && Layout.fill, containerStyle]}>
      <Text
        style={[
          Fonts.OpenSans14_Bold_DBDBDB,
          {color: Colors.blackPrimary_111111},
        ]}>
        {head}
      </Text>
      {detail && (
        <Text
          style={[
            Fonts.OpenSans14_Regular_DBDBDB,
            {color: Colors.gray_707070},
          ]}>
          {detail}
        </Text>
      )}
    </View>
  );
};

export default Text14_HeadAndDetail;

const styles = StyleSheet.create({});
