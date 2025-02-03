import {StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import AuthScreenWrapper from './_component/AuthScreenWrapper';
import {AuthScreenProps} from 'types/navigation';
import OtpInput from '@/components/Input/OtpInput';
import Button from '@/components/Button';
import {useTheme} from '@/hooks';
import {useSendOtpMutation} from '@/services/modules/Auth/forgotPassword';
import {isNumberString} from '@/utils/functions';

const OtpScreen = ({navigation, route}: AuthScreenProps) => {
  const {Gutters, Fonts} = useTheme();
  const email = route.params?.email;
  const [sendOtp, {isLoading}] = useSendOtpMutation();
  const [code, setCode] = useState('');

  const handleNext = () => {
    sendOtp({
      payload: {token: code},
    }).then(res => {
      if (res?.data?.message) {
        navigation.navigate('ResetPasswordNewPasswordScreen', {code});
      }
    });
  };
  return (
    <AuthScreenWrapper
      heading="Verification Code"
      subHeading={`Please enter your 4 digit pin sent to your ${email}`}>
      <OtpInput editable={!isLoading} value={code} setValue={setCode} />
      <Button
        varient="border_dark_111111"
        title="VERIFY"
        onPress={handleNext}
        loading={isLoading}
        disabled={code.length == 4 && isNumberString(code) ? false : true}
        containerStyle={[Gutters.extraLargeTMargin, Gutters.largeBMargin]}
      />
      <Text
        onPress={() => navigation.pop(2)}
        style={[Fonts.OpenSans14_Regular_DBDBDB, Fonts.textCenter]}>
        Back to Login
      </Text>
    </AuthScreenWrapper>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({});
