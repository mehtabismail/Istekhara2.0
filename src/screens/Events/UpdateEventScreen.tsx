import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AppScreenBackground from '@/components/AppScreenBackground';
import AddEvent from './_components/AddEvent';
import InfoModal from '@/components/InfoModal';
import {useTheme} from '@/hooks';
import Button from '@/components/Button';
import {useAppSelector} from '@/store';

const UpdateEventScreen = ({navigation, route}: any) => {
  const {Layout, Gutters, Colors, Fonts} = useTheme();
  const eventData = useAppSelector(state => state.events?.selectedEvent);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [step, setStep] = useState(0);

  return (
    <AppScreenBackground>
      {step > 0 ? (
        <InfoModal>
          <InfoModal.Success
            customButton={
              <View style={[Gutters.xLittleHMargin]}>
                <Button
                  title="VIEW EVENT DETAILS"
                  containerStyle={[Gutters.regularTMargin]}
                  onPress={() => navigation.goBack()}
                />
              </View>
            }
            onPress={() => navigation.goBack()}>
            <Text
              style={[
                Fonts.OpenSans20_Regular_DBDBDB,
                Gutters.largeHPadding,
                Fonts.textCenter,
                Fonts.black_111111,
              ]}>
              You have successfully updated{' '}
              <Text style={[Fonts.OpenSans20_Bold_111111]}>
                {eventData?.event?.name}
              </Text>
            </Text>
          </InfoModal.Success>
        </InfoModal>
      ) : (
        <>
          <AppScreenBackground.Header backPress={() => navigation.goBack()}>
            Edit Event
          </AppScreenBackground.Header>
          <AppScreenBackground.Body>
            <AddEvent
              showDatePicker={showDatePicker}
              setShowDatePicker={setShowDatePicker}
              edit={true}
              editData={eventData?.event}
              setStep={setStep}
            />
          </AppScreenBackground.Body>
        </>
      )}
    </AppScreenBackground>
  );
};

export default UpdateEventScreen;

const styles = StyleSheet.create({});
