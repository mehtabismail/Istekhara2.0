import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import * as Yup from 'yup';
import Input from '@/components/Input/Input';
import Button from '@/components/Button';
import {useTheme} from '@/hooks';

interface PROPS {
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  onComplete: () => void;
  isValid: boolean;
  newPasswords: {
    password1: string;
    password2: string;
  };
  setNewPasswords: React.Dispatch<
    React.SetStateAction<{
      password1: string;
      password2: string;
    }>
  >;
}

const CreatePassword = ({
  setIsValid,
  onComplete,
  isValid,
  newPasswords,
  setNewPasswords,
}: PROPS) => {
  const {Gutters, Colors, Fonts, Layout} = useTheme();
  const password1Ref = useRef<any>(null);
  const password2Ref = useRef<any>(null);

  const [errors, setErrors] = useState({password1: '', password2: ''});

  const validationSchema = Yup.object({
    password1: Yup.string()
      .min(6, 'Password needs to be minimum of 6 characters.')
      .required('Please enter your new password'),
    password2: Yup.string()
      .required('Confirm password can not be empty')
      // .oneOf([Yup.ref('password1'), null], 'Confirm password does not match'),
      .test(
        'password-match',
        'Confirm password does not match',
        function (value) {
          const {password1} = this.parent; // Access the other field's value
          if (!value) {
            return true; // Skip if empty; handled by `.required()`
          }
          return value === password1; // Check if passwords match
        },
      ),
  });

  const apiCall = () => {
    onComplete();
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
      setIsValid(true);
    } catch (error: any) {
      setIsValid(false);
    }
  };

  useEffect(() => {
    validatePassword();
  }, [newPasswords]);
  return (
    <View>
      <Input
        ref={password1Ref}
        onSubmitEditing={() => password2Ref?.current?.focus()}
        returnKeyType="go"
        value={newPasswords?.password1}
        onFocus={() => setErrors({...errors, password1: ''})}
        setValue={(t: string) =>
          setNewPasswords({...newPasswords, password1: t})
        }
        title="Password:"
        type="password"
        errorText={errors?.password1}
      />
      <Input
        ref={password2Ref}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        value={newPasswords.password2}
        onFocus={() => setErrors({...errors, password2: ''})}
        setValue={(t: string) =>
          setNewPasswords({...newPasswords, password2: t})
        }
        title="Confirm Password:"
        type="password"
        errorText={errors?.password2}
      />
      <Button
        title="NEXT"
        onPress={handleSubmit}
        varient={isValid ? 'gray_DBDBDB' : 'border_dark_111111'}
        containerStyle={[Gutters.largeVMargin]}
      />
    </View>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({});
