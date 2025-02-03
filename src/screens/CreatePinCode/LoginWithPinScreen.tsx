import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AuthScreenWrapper from '../Auth/_component/AuthScreenWrapper';
import {useTheme} from '@/hooks';
import Button from '@/components/Button';
import OtpInput from '@/components/Input/OtpInput';
import {useVerifyPinMutation} from '@/services/modules/CreatePin/PinVerify';
import {isNumberString} from '@/utils/functions';
import {toast} from '@/utils/toast';

const LoginWithPinScreen = ({navigation}: any) => {
  const {Gutters, Fonts, Layout, Images} = useTheme();
  const [verifyPin, {isLoading}] = useVerifyPinMutation();
  const [code, setCode] = useState('');
  const [success, setSuccess] = useState(false);

  const successAction = () => {
    toast.success('Logged in successfully');
    navigation.replace('BottomTabNavigator');
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
      heading="Welcome Back"
      subHeading="Please enter your 4 digit pin">
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
        title="login"
        loading={isLoading}
        disabled={code.length == 4 && isNumberString(code) ? false : true}
        onPress={() => {
          success ? successAction() : submit();
        }}
        varient={success ? 'gray_DBDBDB' : 'border_dark_111111'}
        containerStyle={[Gutters.xRegularVMargin]}
      />
      {!success && (
        <Text
          onPress={() => navigation.navigate('ResetPinEmailScreen')}
          style={[
            Fonts.OpenSans14_Regular_DBDBDB,
            Gutters.littleTMargin,
            Fonts.textCenter,
          ]}>
          Forgot Pin?
        </Text>
      )}
    </AuthScreenWrapper>
  );
};

export default LoginWithPinScreen;

const styles = StyleSheet.create({});
