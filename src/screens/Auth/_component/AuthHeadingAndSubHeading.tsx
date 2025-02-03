import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';

interface PROPS {
  heading: string;
  subHeading: string;
}

const AuthHeadingAndSubHeading = ({heading, subHeading}: PROPS) => {
  const {Colors, Layout, Gutters, Fonts} = useTheme();
  return (
    <View style={[Layout.center, Gutters.xSmallBMargin]}>
      <Text style={[Fonts.OpenSans35_Bold_DBDBDB, Fonts.textCenter]}>
        {heading}
      </Text>
      <Text
        style={[
          Fonts.OpenSans20_Regular_DBDBDB,
          Gutters.tinyTMargin,
          Fonts.textCenter,
        ]}>
        {subHeading}
      </Text>
    </View>
  );
};

export default AuthHeadingAndSubHeading;

const styles = StyleSheet.create({});
