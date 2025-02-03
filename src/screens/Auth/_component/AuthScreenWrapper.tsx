import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AuthScreenBackground from './AuthScreenBackground';
import CustomScroll from '@/components/CustomScroll';
import AuthHeadingAndSubHeading from './AuthHeadingAndSubHeading';
import {useTheme} from '@/hooks';
import {mS} from '@/utils/functions';

interface PROPS {
  heading: string;
  subHeading: string;
  children: any;
}

const AuthScreenWrapper = ({heading, subHeading, children}: PROPS) => {
  const {Layout, Gutters} = useTheme();
  return (
    <AuthScreenBackground paddingHorizontal={mS(25)}>
      <CustomScroll
        contentContainerStyle={[
          Layout.justifyContentCenter,
          Gutters.smallVMargin,
        ]}>
        <AuthHeadingAndSubHeading heading={heading} subHeading={subHeading} />
        <View style={{paddingHorizontal: mS(20)}}>{children}</View>
      </CustomScroll>
    </AuthScreenBackground>
  );
};

export default AuthScreenWrapper;

const styles = StyleSheet.create({});
