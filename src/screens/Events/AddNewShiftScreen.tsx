import {StyleSheet, Text, View, BackHandler} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTheme} from '@/hooks';
import AppScreenBackground from '@/components/AppScreenBackground';
import AddShift from './_components/AddShift';
import {useAppSelector} from '@/store';
import InfoModal from '@/components/InfoModal';
import Button from '@/components/Button';

const AddNewShiftScreen = ({navigation, route}: any) => {
  const {Layout, Gutters, Colors, Fonts, Images} = useTheme();
  const eventData = useAppSelector(state => state.events?.selectedEvent);
  const isCreateEvent = route?.params?.isCreateEvent;
  const [step, setStep] = useState(0);
  const [createdShift, setCreatedShift] = useState({});

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isCreateEvent) {
          navigation.pop(2);
        } else {
          navigation.goBack();
        }
        return true;
      },
    );
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <AppScreenBackground>
      {step == 1 ? (
        <InfoModal>
          <InfoModal.Success
            customButton={
              <View style={[Gutters.xLittleHMargin]}>
                <Button
                  title="CONTINUE"
                  containerStyle={[Gutters.regularTMargin]}
                  onPress={() => {
                    if (isCreateEvent) {
                      navigation.replace('ShiftsListScreen', {
                        isCreateEvent: true,
                      });
                    } else {
                      navigation.goBack();
                    }
                  }}
                />
              </View>
            }
            onPress={() => {
              if (isCreateEvent) {
                navigation.pop(2);
              } else {
                navigation.goBack();
              }
            }}>
            <Text
              style={[
                Fonts.OpenSans20_Regular_DBDBDB,
                Fonts.textCenter,
                {color: Colors.blackPrimary_111111},
              ]}>
              {`You have successfully added a shift: ${createdShift?.name} (${createdShift?.start_time} - ${createdShift?.end_time} ) to `}
              <Text style={[Fonts.OpenSans20_Bold_111111]}>
                {eventData?.event?.name}
              </Text>
            </Text>
          </InfoModal.Success>
        </InfoModal>
      ) : (
        <>
          <AppScreenBackground.Header
            backPress={() => {
              console.log('cccc');
              if (isCreateEvent) {
                navigation.pop(2);
              } else {
                navigation.goBack();
              }
            }}>
            Add New Shift
          </AppScreenBackground.Header>
          <AppScreenBackground.Body>
            <AddShift
              addNewShift={true}
              createdEvent={eventData?.event}
              setStep={setStep}
              setCreatedShift={setCreatedShift}
              isCreateEvent={isCreateEvent}
            />
          </AppScreenBackground.Body>
        </>
      )}
    </AppScreenBackground>
  );
};

export default AddNewShiftScreen;

const styles = StyleSheet.create({});
