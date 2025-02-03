import {BackHandler, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AuthScreenWrapper from './_component/AuthScreenWrapper';
import {AuthScreenProps} from 'types/navigation';
import {useTheme} from '@/hooks';
import Button from '@/components/Button';
import {mS} from '@/utils/functions';

const CongratulationsScreen = ({navigation, route}: AuthScreenProps) => {
  const {heading, subHeading, buttonText, buttonAction}: any = route?.params;
  const {Gutters, Layout, Images} = useTheme();

  useEffect(() => {
    const backAction = () => {
      // buttonAction();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const handleNext = () => {
    buttonAction();
  };

  return (
    <AuthScreenWrapper heading={heading} subHeading={subHeading}>
      <View style={[Layout.center, Gutters.smallVMargin]}>
        <Images.svgIcon.sucessThumb height={mS(168)} width={mS(168)} />
      </View>
      <Button
        onPress={handleNext}
        title={buttonText}
        varient="gray_DBDBDB"
        containerStyle={[Gutters.regularTMargin]}
      />
    </AuthScreenWrapper>
  );
};

export default CongratulationsScreen;

const styles = StyleSheet.create({});
