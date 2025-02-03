import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import AuthScreenWrapper from '../Auth/_component/AuthScreenWrapper';
import StepsComponent from './_component/StepsComponent';
import CreatePassword from './_component/CreatePassword';
import CreatePinComponent from './_component/CreatePinComponent';
import {AuthScreenProps} from 'types/navigation';
import {useAppSelector} from '@/store';
import {useCreatePinPasswordMutation} from '@/services/modules/CreatePin/CreatePinPassword';

const CreatePinScreen = ({navigation}: any) => {
  const {user} = useAppSelector(state => state.auth);

  console.log('user==>', user);

  const [step, setStep] = useState(1);
  const [isValid, setIsValid] = useState(false);
  const [newPasswords, setNewPasswords] = useState({
    password1: '',
    password2: '',
  });
  const [stepsList, setStepsList] = useState([
    {completed: false, title: 'Create Password'},
    {completed: false, title: 'Create 4-Digit Pin'},
  ]);

  return (
    <AuthScreenWrapper
      heading={`Hi ${user?.first_name}`}
      subHeading="Set your new password.">
      <StepsComponent isValid={isValid} step={step} data={stepsList} />
      {step == 1 ? (
        <CreatePassword
          newPasswords={newPasswords}
          setNewPasswords={setNewPasswords}
          isValid={isValid}
          setIsValid={setIsValid}
          onComplete={() => {
            let newList = stepsList;
            newList[step - 1] = {...newList[step - 1], completed: true};
            setStepsList(newList);
            setIsValid(false);
            setStep(2);
          }}
        />
      ) : (
        <CreatePinComponent
          newPasswords={newPasswords}
          isValid={isValid}
          setIsValid={setIsValid}
          onComplete={() => {
            let newList = stepsList;
            newList[step - 1] = {...newList[step - 1], completed: true};
            setStepsList(newList);
            setIsValid(false);
            setStep(3);
            setTimeout(() => {
              navigation.replace('CongratulationsScreen', {
                heading: 'Congratulations',
                subHeading: 'You have successfully created your account.',
                buttonText: 'CONTINUE TO YOUR DASHBOARD',
                buttonAction: () => {
                  navigation.navigate('BottomTabNavigator');
                },
              });
            }, 4000);
          }}
        />
      )}
    </AuthScreenWrapper>
  );
};

export default CreatePinScreen;

const styles = StyleSheet.create({});
