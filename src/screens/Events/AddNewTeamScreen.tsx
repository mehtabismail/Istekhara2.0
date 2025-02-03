import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppScreenBackground from '@/components/AppScreenBackground';
import {useAppSelector} from '@/store';
import AddTeams from './_components/AddTeams';
import InfoModal from '@/components/InfoModal';
import {useTheme} from '@/hooks';
import Button from '@/components/Button';
import {useLazyGetUsersQuery} from '@/services/modules/Common/dropdownLists';
import Loader from '@/components/Loader';
import LoginModal from './_components/LoginModal';

const AddNewTeamScreen = ({navigation}: any) => {
  const {Layout, Gutters, Colors, Fonts, Images} = useTheme();
  const [getUsers] = useLazyGetUsersQuery();
  const eventData = useAppSelector(state => state.events?.selectedEvent);
  const selectedShift = useAppSelector(state => state.events?.selectedShift);
  const [step, setStep] = useState(0);
  const [createdTeam, setCreatedTeam] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginModal, setLoginModal] = useState('');

  const getData = async () => {
    setLoading(true);
    await getUsers({});
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AppScreenBackground>
      {loading ? (
        <Loader />
      ) : loginModal ? (
        <LoginModal
          addNewTeam={true}
          navigation={navigation}
          URL={loginModal}
        />
      ) : step == 3 ? (
        <InfoModal>
          <InfoModal.Success
            customButton={
              <View style={[Gutters.xLittleHMargin]}>
                <Button
                  title="CONTINUE"
                  containerStyle={[Gutters.regularTMargin]}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              </View>
            }>
            <Text
              numberOfLines={4}
              style={[
                Fonts.OpenSans20_Regular_DBDBDB,
                Fonts.textCenter,
                {color: Colors.blackPrimary_111111},
              ]}>
              {`You have successfully added teams: `}
              <Text style={[Fonts.OpenSans20_Bold_111111]}>
                {createdTeam?.map((team: any) => team.name).join(', ')}
              </Text>
            </Text>
          </InfoModal.Success>
        </InfoModal>
      ) : (
        <>
          <AppScreenBackground.Header backPress={() => navigation.goBack()}>
            Add New Team
          </AppScreenBackground.Header>
          <AppScreenBackground.Body>
            <AddTeams
              createdEvent={eventData?.event}
              createdShift={selectedShift}
              setStep={setStep}
              setCreatedTeam={setCreatedTeam}
              addNewTeam={true}
              setLoginModal={setLoginModal}
            />
          </AppScreenBackground.Body>
        </>
      )}
    </AppScreenBackground>
  );
};

export default AddNewTeamScreen;

const styles = StyleSheet.create({});
