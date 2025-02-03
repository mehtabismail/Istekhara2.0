import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AuthScreenWrapper from './_component/AuthScreenWrapper';
import Input from '@/components/Input/Input';
import Button from '@/components/Button';
import {useTheme} from '@/hooks';
import * as Yup from 'yup';
import {AuthScreenProps} from 'types/navigation';
import {useSendNewPasswordMutation} from '@/services/modules/Auth/forgotPassword';

const ResetPasswordNewPasswordScreen = ({
  navigation,
  route,
}: AuthScreenProps) => {
  const {Gutters, Fonts} = useTheme();
  const code = route?.params?.code;
  const [newPassword, {isLoading}] = useSendNewPasswordMutation();
  const password1Ref = useRef<any>(null);
  const password2Ref = useRef<any>(null);
  const [valid, setValid] = useState(false);
  const [newPasswords, setNewPasswords] = useState({
    password1: '',
    password2: '',
  }); ////////////////////////////////back to login /////////////////////////////////////////////////////////
  const [errors, setErrors] = useState({password1: '', password2: ''});

  const validationSchema = Yup.object({
    password1: Yup.string()
      .min(6, 'Password needs to be minimum of 6 characters')
      .required('Please enter your new password'),
    password2: Yup.string()
      .required('Confirm password can not be empty')
      .test(
        'password-match',
        'Confirm password does not match',
        function (value) {
          const {password1} = this.parent;
          if (!value) {
            return true;
          }
          return value === password1;
        },
      ),
  });

  const apiCall = () => {
    newPassword({
      payload: {
        confirm_password: newPasswords.password2,
        password: newPasswords.password1,
        token: code,
      },
      code,
    }).then(res => {
      if (res?.data?.message) {
        navigation.navigate('CongratulationsScreen', {
          heading: 'Password Changed',
          subHeading: 'Your have successfully reset your password.',
          buttonText: 'CONTINUE TO LOGIN',
          buttonAction: () => navigation.pop(4),
        });
      }
    });
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    try {
      await validationSchema.validate(newPasswords, {
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

  const validatePassword = async () => {
    try {
      await validationSchema.validate(newPasswords, {
        abortEarly: false,
      });
      setValid(true);
    } catch (error: any) {
      setValid(false);
    }
  };

  useEffect(() => {
    validatePassword();
  }, [newPasswords]);

  return (
    <AuthScreenWrapper
      heading="Reset Password"
      subHeading="Please enter new password.">
      <Input
        ref={password1Ref}
        editable={!isLoading}
        onSubmitEditing={() => password2Ref?.current?.focus()}
        returnKeyType="go"
        value={newPasswords?.password1}
        onFocus={() => setErrors({...errors, password1: ''})}
        setValue={(t: string) =>
          setNewPasswords({...newPasswords, password1: t})
        }
        title="New Password:"
        type="password"
        errorText={errors?.password1}
      />
      <Input
        ref={password2Ref}
        editable={!isLoading}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        value={newPasswords.password2}
        onFocus={() => setErrors({...errors, password2: ''})}
        setValue={(t: string) =>
          setNewPasswords({...newPasswords, password2: t})
        }
        title="Confirm password:"
        type="password"
        errorText={errors?.password2}
      />
      <Button
        loading={isLoading}
        title="SAVE"
        onPress={handleSubmit}
        varient={valid ? 'gray_DBDBDB' : 'border_dark_111111'}
        containerStyle={[Gutters.largeVMargin]}
      />
      <Text
        onPress={() => navigation.pop(3)}
        style={[Fonts.OpenSans14_Regular_DBDBDB, Fonts.textCenter]}>
        Back to Login
      </Text>
    </AuthScreenWrapper>
  );
};

export default ResetPasswordNewPasswordScreen;

const styles = StyleSheet.create({});
