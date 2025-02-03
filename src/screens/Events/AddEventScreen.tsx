import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppScreenBackground from '@/components/AppScreenBackground';
import TopTabBar from '@/components/TopTabBar';
import {useTheme} from '@/hooks';
import AddEvent from './_components/AddEvent';
import {
  useLazyGetClientsQuery,
  useLazyGetUsersQuery,
  useLazyGetVenuesQuery,
} from '@/services/modules/Common/dropdownLists';
import Loader from '@/components/Loader';
import AddShift from './_components/AddShift';
import AddTeams from './_components/AddTeams';
import InfoModal from '@/components/InfoModal';
import Button from '@/components/Button';
import {useLazyGetSelectedEventQuery} from '@/services/modules/Events/events';
import LoginModal from './_components/LoginModal';

let tabsList = [
  {label: 'Event Detail', value: 'event'},
  {label: 'Shift', value: 'shift'},
  {label: 'Teams', value: 'teams'},
];

const AddEventScreen = ({navigation}: any) => {
  const {Layout, Gutters, Colors, Fonts} = useTheme();
  const [getClients] = useLazyGetClientsQuery();
  const [getVenues] = useLazyGetVenuesQuery();
  const [getUsers] = useLazyGetUsersQuery();
  const [getSelectedEvent] = useLazyGetSelectedEventQuery();
  const [tab, setTab] = useState('event');
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [editShift, setEditShift] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [createdShift, setCreatedShift] = useState({});
  const [createdEvent, setCreatedEvent] = useState({});
  const [loginModal, setLoginModal] = useState('');

  const getDropDownData = async () => {
    setLoading(true);
    await getClients({});
    await getVenues({});
    await getUsers({});
    setLoading(false);
  };

  const handleNewShift = () => {
    setLoading(true);
    getSelectedEvent({_id: createdEvent?._id}).then(res => {
      setLoading(false);
      if (res?.data?.event) {
        navigation.navigate('AddNewShiftScreen', {isCreateEvent: true});
      }
    });
  };

  useEffect(() => {
    getDropDownData();
  }, []);

  return (
    <AppScreenBackground>
      {loginModal ? (
        <LoginModal navigation={navigation} URL={loginModal} />
      ) : step >= 3 ? (
        <InfoModal>
          <InfoModal.Success
            customButton={
              <View style={[Gutters.xLittleHMargin]}>
                <Button
                  varient="gray_707070"
                  title="ADD ANOTHER SHIFT"
                  onPress={handleNewShift}
                  loading={loading}
                />
                <Button
                  title="VIEW ALL EVENTS"
                  containerStyle={[Gutters.regularTMargin]}
                  onPress={() => navigation.goBack()}
                  disabled={loading ? true : false}
                />
              </View>
            }
            onPress={() => navigation.goBack()}>
            <Text
              style={[
                Fonts.OpenSans20_Regular_DBDBDB,
                Fonts.textCenter,
                {color: Colors.blackPrimary_111111},
              ]}>
              You have successfully created an event.
            </Text>
          </InfoModal.Success>
        </InfoModal>
      ) : (
        <>
          <AppScreenBackground.Header backPress={() => navigation.goBack()}>
            Create New Event
          </AppScreenBackground.Header>
          <AppScreenBackground.Body>
            {!showDatePicker && (
              <TopTabBar
                tabsList={tabsList}
                selected={tab}
                setSelected={setTab}
                step={step}
                setStep={setStep}
                touchDisabled
              />
            )}
            {loading ? (
              <Loader />
            ) : tab == 'event' ? (
              <AddEvent
                showDatePicker={showDatePicker}
                setShowDatePicker={setShowDatePicker}
                setCreatedEvent={setCreatedEvent}
                setStep={setStep}
                setTab={setTab}
                createdEvent={createdEvent}
                setEditEvent={setEditEvent}
                editEvent={editEvent}
              />
            ) : tab == 'shift' ? (
              <AddShift
                createdEvent={createdEvent}
                setCreatedShift={setCreatedShift}
                setStep={setStep}
                setTab={setTab}
                setEditEvent={setEditEvent}
                createdShift={createdShift}
                editShift={editShift}
              />
            ) : tab == 'teams' ? (
              <AddTeams
                createdEvent={createdEvent}
                createdShift={createdShift}
                setStep={setStep}
                setTab={setTab}
                setEditShift={setEditShift}
                setLoginModal={setLoginModal}
              />
            ) : null}
          </AppScreenBackground.Body>
        </>
      )}
    </AppScreenBackground>
  );
};

export default AddEventScreen;

const styles = StyleSheet.create({});
