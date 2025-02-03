import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoaderKit from 'react-native-loader-kit';
import {useTheme} from '@/hooks';

const Loader = () => {
  const {Colors, Layout} = useTheme();
  return (
    <View style={[Layout.fill, Layout.center, {backgroundColor: Colors.white}]}>
      <LoaderKit
        style={{width: 50, height: 50}}
        name={'BallClipRotatePulse'}
        color={Colors.blackPrimary_111111}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
