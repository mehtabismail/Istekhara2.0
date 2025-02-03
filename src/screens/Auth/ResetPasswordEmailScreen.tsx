import {Keyboard, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@/hooks';
import AuthScreenWrapper from './_component/AuthScreenWrapper';
import Input from '@/components/Input/Input';
import Button from '@/components/Button';
import {AuthScreenProps} from 'types/navigation';
import * as Yup from 'yup';
import {useSendEmailMutation} from '@/services/modules/Auth/forgotPassword';

const ResetPasswordEmailScreen = ({navigation}: AuthScreenProps) => {
  const {Gutters, Fonts} = useTheme();
  const [sendEmail, {isLoading}] = useSendEmailMutation();

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({email: ''});

  const validationSchema = Yup.string()
    .email('Invalid email address')
    .required('Email address is required');

  const apiCall = async () => {
    sendEmail({payload: {email}}).then((res: any) => {
      if (res?.data?.message) {
        navigation.navigate('OtpScreen', {email});
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
      heading="Reset Your Password"
      subHeading="Please enter your email address. Instructions on how to reset your password will be given through email.">
      <Input
        onSubmitEditing={submit}
        returnKeyType="done"
        value={email}
        editable={!isLoading}
        onFocus={() => setErrors({email: ''})}
        setValue={(t: string) => setEmail(t.trim())}
        title="Email"
        keyboardType="email-address"
        type="text"
        errorText={errors.email}
      />
      <Button
        title="RESET PASSWORD"
        onPress={submit}
        loading={isLoading}
        varient="border_dark_111111"
        containerStyle={[Gutters.largeVMargin]}
      />
      <Text
        onPress={() => navigation.goBack()}
        style={[Fonts.OpenSans14_Regular_DBDBDB, Fonts.textCenter]}>
        Back to Login
      </Text>
    </AuthScreenWrapper>
  );
};

export default ResetPasswordEmailScreen;

const styles = StyleSheet.create({});
