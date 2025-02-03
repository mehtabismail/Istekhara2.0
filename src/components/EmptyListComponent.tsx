import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';

const EmptyListComponent = () => {
  const {Layout, Colors, Gutters, Fonts} = useTheme();
  return (
    <View style={[Layout.fill, Layout.center, Gutters.smallTMargin]}>
      <Text
        style={[
          Fonts.OpenSans16_SemiBold_111111,
          {color: Colors.blackPrimary_111111},
        ]}>
        No data found
      </Text>
    </View>
  );
};

export default EmptyListComponent;

const styles = StyleSheet.create({});
