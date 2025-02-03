import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import OtpInput from '@/components/Input/OtpInput';
import {useTheme} from '@/hooks';
import Button from '@/components/Button';
import {isNumberString} from '@/utils/functions';
import {useCreatePinPasswordMutation} from '@/services/modules/CreatePin/CreatePinPassword';

interface PROPS {
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  onComplete: () => void;
  isValid: boolean;
  newPasswords: {
    password1: string;
    password2: string;
  };
}

const CreatePinComponent = ({
  isValid,
  newPasswords,
  onComplete,
  setIsValid,
}: PROPS) => {
  const {Gutters, Images, Layout} = useTheme();
  const [createPin, {isLoading}] = useCreatePinPasswordMutation();
  const [pin, setPin] = useState('');
  const [success, setSuccess] = useState(false);

  const submit = () => {
    if (isValid) {
      createPin({
        payload: {
          confirm_password: newPasswords.password2,
          password: newPasswords.password1,
          pin_code: pin,
        },
      }).then(res => {
        if (res?.data?.user) {
          setSuccess(true);
          onComplete();
        }
      });
    }
  };

  useEffect(() => {
    if (pin.length == 4 && isNumberString(pin)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [pin]);

  return (
    <View>
      <OtpInput
        editable={!isLoading}
        rootStyle={[Gutters.extraLargeTMargin, Gutters.xRegularBMargin]}
        value={pin}
        setValue={setPin}
      />
      {success && (
        <View style={[Layout.center]}>
          <Images.svgIcon.checkCircleGreen height={73} width={73} />
        </View>
      )}
      <Button
        disabled={!isValid}
        containerStyle={[Gutters.xRegularTMargin]}
        title="FINISH"
        loading={isLoading}
        onPress={submit}
        varient={isValid ? 'gray_DBDBDB' : 'border_dark_111111'}
      />
    </View>
  );
};

export default CreatePinComponent;

const styles = StyleSheet.create({});
