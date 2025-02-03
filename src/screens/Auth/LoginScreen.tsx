import {Keyboard, StyleSheet, Text} from 'react-native';
import React, {useRef, useState} from 'react';
import {useTheme} from '@/hooks';
import Input from '@/components/Input/Input';
import Button from '@/components/Button';
import {AuthScreenProps} from 'types/navigation';
import AuthScreenWrapper from './_component/AuthScreenWrapper';
import * as Yup from 'yup';
import {useLoginMutation} from '@/services/modules/Auth/login';
import moment from 'moment-timezone';

const LoginScreen = ({navigation, route}: AuthScreenProps) => {
  const {Gutters, Fonts} = useTheme();
  const [login, {isLoading}] = useLoginMutation();
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const currentTimezone = moment.tz.guess();

  const [errors, setErrors] = useState<{
    email: string;
    password: string;
  }>({email: '', password: ''});

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const loginSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email address is required'),
    password: Yup.string().required('Password is required'),
  });
  const apiCall = () => {
    let reqObj = {
      current_time_zone: currentTimezone,
      email: userData?.email.trim(),
      login: true,
      password: userData?.password.trim(),
    };
    login({
      payload: reqObj,
    });
  };

  const submit = async () => {
    Keyboard.dismiss();
    try {
      await loginSchema.validate(userData, {
        abortEarly: false,
      });
      apiCall();
    } catch (error: any) {
      const formattedErrors: any = {};
      error.inner.forEach((error: any) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <AuthScreenWrapper heading="NZ Roadies" subHeading="Please login below">
      <Input
        ref={emailRef}
        onSubmitEditing={() => passwordRef?.current?.focus()}
        editable={!isLoading}
        returnKeyType="go"
        value={userData?.email}
        onFocus={() => setErrors({...errors, email: ''})}
        setValue={(t: string) => setUserData({...userData, email: t})}
        title="Email"
        keyboardType="email-address"
        type="text"
        errorText={errors?.email}
      />
      <Input
        ref={passwordRef}
        onSubmitEditing={submit}
        editable={!isLoading}
        returnKeyType="done"
        value={userData.password}
        onFocus={() => setErrors({...errors, password: ''})}
        setValue={(t: string) => setUserData({...userData, password: t})}
        title="Password"
        type="password"
        errorText={errors?.password}
      />
      <Button
        title="login"
        loading={isLoading}
        onPress={submit}
        varient="border_dark_111111"
        containerStyle={[Gutters.largeVMargin]}
      />
      <Text
        onPress={() => navigation.navigate('ResetPasswordEmailScreen')}
        style={[Fonts.OpenSans14_Regular_DBDBDB, Fonts.textCenter]}>
        Forgot Password?
      </Text>
    </AuthScreenWrapper>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
