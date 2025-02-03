import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AuthScreenWrapper from '../Auth/_component/AuthScreenWrapper';
import {useTheme} from '@/hooks';
import Button from '@/components/Button';
import OtpInput from '@/components/Input/OtpInput';
import {useVerifyPinMutation} from '@/services/modules/CreatePin/PinVerify';
import {isNumberString} from '@/utils/functions';

const LoginWithTempPin = ({navigation, route}: any) => {
  const {Gutters, Fonts, Layout, Images} = useTheme();
  const [verifyPin, {isLoading}] = useVerifyPinMutation();
  const {email} = route?.params;
  const [code, setCode] = useState('');
  const [success, setSuccess] = useState(false);

  const successAction = () => {
    navigation.replace('CongratulationsScreen', {
      heading: 'Success!',
      subHeading:
        'You are currently using a temporary PIN. You can update your PIN from your profile settings',
      buttonText: 'CONTINUE TO YOUR DASHBOARD',
      buttonAction: () => {
        navigation.replace('BottomTabNavigator');
      },
    });
  };

  const submit = () => {
    Keyboard.dismiss();
    verifyPin({
      payload: {
        pin_code: code,
      },
    }).then(res => {
      if (res?.data?.message) {
        setSuccess(true);
      }
    });
  };
  return (
    <AuthScreenWrapper
      heading="Enter Temporary Pin"
      subHeading={`Please enter your 4 digit temporary pin sent to your ${email}`}>
      <OtpInput
        editable={!isLoading && !success}
        value={code}
        setValue={setCode}
        rootStyle={[Gutters.xRegularBMargin]}
      />
      {success && (
        <View style={[Layout.center]}>
          <Images.svgIcon.checkCircleGreen height={73} width={73} />
        </View>
      )}
      <Button
        title="CONTINUE"
        loading={isLoading}
        disabled={code.length == 4 && isNumberString(code) ? false : true}
        onPress={() => {
          success ? successAction() : submit();
        }}
        varient={success ? 'gray_DBDBDB' : 'border_dark_111111'}
        containerStyle={[Gutters.xRegularVMargin]}
      />
    </AuthScreenWrapper>
  );
};

export default LoginWithTempPin;

const styles = StyleSheet.create({});
