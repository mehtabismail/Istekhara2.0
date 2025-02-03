import {Keyboard, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@/hooks';

import Input from '@/components/Input/Input';
import Button from '@/components/Button';
import {AuthScreenProps} from 'types/navigation';
import * as Yup from 'yup';
import {useSendEmailMutation} from '@/services/modules/Auth/forgotPassword';
import AuthScreenWrapper from '../Auth/_component/AuthScreenWrapper';
import {useForgotPinMutation} from '@/services/modules/CreatePin/PinVerify';

const ResetPinEmailScreen = ({navigation}: any) => {
  const {Gutters, Fonts} = useTheme();
  const [sendEmail, {isLoading}] = useForgotPinMutation();

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({email: ''});

  const validationSchema = Yup.string()
    .email('Invalid email address')
    .required('Email address is required');

  const apiCall = async () => {
    sendEmail({payload: {email}}).then((res: any) => {
      if (res?.data?.message) {
        navigation.navigate('LoginWithTempPin', {email});
      }
    });
  };

  const submit = async () => {
    Keyboard.dismiss();
    try {
      await validationSchema.validate(email, {
        abortEarly: false,
      });
      apiCall();
    } catch (error: any) {
      const formattedErrors: any = {};
      error.inner.forEach((error: any) => {
        formattedErrors['email'] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <AuthScreenWrapper
      heading="Reset your 4-Digit Pin"
      subHeading="Please enter your email address. Instructions on how to reset your pin will be given through email.">
      <Input
        onSubmitEditing={submit}
        returnKeyType="done"
        value={email}
        editable={!isLoading}
        onFocus={() => setErrors({email: ''})}
        setValue={(t: string) => setEmail(t)}
        title="Email"
        keyboardType="email-address"
        type="text"
        errorText={errors.email}
      />
      <Button
        title="RESET 4-DIGIT PIN"
        onPress={submit}
        loading={isLoading}
        varient="border_dark_111111"
        containerStyle={[Gutters.largeVMargin]}
      />
    </AuthScreenWrapper>
  );
};

export default ResetPinEmailScreen;

const styles = StyleSheet.create({});
