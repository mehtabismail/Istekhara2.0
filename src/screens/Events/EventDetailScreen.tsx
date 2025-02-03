import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppScreenBackground from '@/components/AppScreenBackground';
import {useTheme} from '@/hooks';
import {getStringWithCount, mS} from '@/utils/functions';
import CustomScroll from '@/components/CustomScroll';
import Text14_HeadAndDetail from '@/components/UI/TextComponents/Text14_HeadAndDetail';
import {Box, Container, Row} from '@/components/UI/Layout';
import RowCardWrapper from '@/components/RowCard/RowCardWrapper';
import YellowChip12Text from '@/components/UI/YellowChip12Text';
import Button from '@/components/Button';
import {
  useDeleteEventMutation,
  useLazyGetSelectedEventQuery,
} from '@/services/modules/Events/events';
import Loader from '@/components/Loader';
import {useAppSelector} from '@/store';
import moment from 'moment';
import InfoModal, {INFO_MODAL} from '@/components/InfoModal';

const EventDetailScreen = ({navigation, route}: any) => {
  const {Layout, Gutters, Colors, Fonts, Images} = useTheme();
  const [getSelectedEvent, {isLoading}] = useLazyGetSelectedEventQuery();
  const [deleteEvent, {isLoading: loading}] = useDeleteEventMutation();
  const {id} = route?.params;
  const {selectedEvent} = useAppSelector(state => state.events);

  const [showModal, setShowModal] = useState<INFO_MODAL>('');

  const deleteAction = () => {
    deleteEvent({_id: selectedEvent?.event?._id}).then(res => {
      if (res?.data?.message) {
        setShowModal('success');
      }
    });
  };

  useEffect(() => {
    getSelectedEvent({_id: id});
  }, []);

  return (
    <AppScreenBackground>
      {isLoading ? (
        <Loader />
      ) : showModal == 'success' ? (
        <InfoModal>
          <InfoModal.Success
            customButton={
              <Button
                title="VIEW ALL EVENTS"
                onPress={() => navigation?.goBack()}
              />
            }
            onPress={() => navigation?.goBack()}>
            <Text
              style={[
                Fonts.OpenSans20_Regular_DBDBDB,
                Fonts.textCenter,
                {color: Colors.blackPrimary_111111},
              ]}>
              You have successfully deleted{' '}
              <Text style={[Fonts.OpenSans20_Bold_111111]}>
                {selectedEvent?.event?.name + '.'}
              </Text>
            </Text>
          </InfoModal.Success>
        </InfoModal>
      ) : showModal == 'confirmation' ? (
        <InfoModal>
          <InfoModal.Confirmation
            messageText="Are you sure you want to delete "
            highlightText={selectedEvent?.event?.name + '?'}
            cancelPress={() => setShowModal('')}
            yesPress={deleteAction}
            isLoading={loading}
          />
        </InfoModal>
      ) : (
        <>
          <AppScreenBackground.Header
            backPress={() => navigation.goBack()}
            rightItem={
              <TouchableOpacity
                onPress={() => navigation.navigate('UpdateEventScreen')}
                disabled={isLoading}>
                <Images.svgIcon.edit
                  color={Colors.blackPrimary_111111}
                  width={mS(21)}
                  height={mS(21)}
                />
              </TouchableOpacity>
            }>
            {selectedEvent?.event?.name}
          </AppScreenBackground.Header>
          <AppScreenBackground.Body>
            <CustomScroll>
              <Container spacing="xRegular" vertical="small">
                <Row>
                  <Text14_HeadAndDetail
                    head="Event Name"
                    detail={selectedEvent?.event?.name}
                    fill
                  />
                  <Text14_HeadAndDetail
                    head="Client"
                    detail={selectedEvent?.event?.client?.name}
                    fill
                  />
                </Row>
                <Text14_HeadAndDetail
                  head="Description"
                  detail={
                    selectedEvent?.event?.description
                      ? selectedEvent?.event?.description
                      : 'N/A'
                  }
                  fill
                  containerStyle={[Gutters.regularTMargin]}
                />
                <Text14_HeadAndDetail
                  head="Venue"
                  detail={`${selectedEvent?.event?.venue?.name}, ${selectedEvent?.event?.venue?.address}`}
                  fill
                  containerStyle={[Gutters.largeTMargin]}
                />
              </Container>
              <View
                style={[
                  Gutters.largeBPadding,
                  Gutters.xRegularLPadding,
                  {
                    borderBottomColor: Colors.gray_F2F2F2,
                    borderBottomWidth: mS(1.5),
                  },
                ]}>
                <Text14_HeadAndDetail
                  head="Date/s"
                  fill
                  containerStyle={[
                    Gutters.regularTPadding,
                    Gutters.tinyBMargin,
                  ]}
                />
                <Row flexWrap="wrap" style={[]}>
                  {selectedEvent?.event?.time_slots.map((val, key) => {
                    return (
                      <YellowChip12Text
                        key={key}
                        containerStyle={[
                          {marginBottom: mS(8), marginRight: mS(12)},
                        ]}>
                        {moment(val?.date).format('DD MMM YY')}
                      </YellowChip12Text>
                    );
                  })}
                </Row>
              </View>

              <RowCardWrapper
                onPress={() => navigation.navigate('ShiftsListScreen')}>
                <Row align="center" style={[Gutters.littleHPadding]}>
                  <Text
                    style={[
                      Fonts.OpenSans14_Bold_DBDBDB,
                      {color: Colors.blackPrimary_111111},
                    ]}>
                    Shifts
                  </Text>
                  <Text
                    style={[
                      Fonts.OpenSans16_Regular_white,
                      Gutters.xRegularLMargin,
                      {color: Colors.blackPrimary_111111},
                    ]}>
                    {getStringWithCount(selectedEvent?.shifts, 'Shift')}
                  </Text>
                </Row>
              </RowCardWrapper>
              <Container spacing="xRegular" vertical="small">
                <Text14_HeadAndDetail
                  head="Other Information"
                  detail={
                    selectedEvent?.event?.information
                      ? selectedEvent?.event?.information
                      : 'N/A'
                  }
                  fill
                  containerStyle={[Gutters.littleVMargin]}
                />
                <Button
                  title="edit information"
                  containerStyle={[Gutters.extraLargeTMargin]}
                  onPress={() => navigation.navigate('UpdateEventScreen')}
                />
                <Button
                  varient="red_FF0000"
                  onPress={() => setShowModal('confirmation')}
                  title="delete"
                  containerStyle={[Gutters.littleVMargin]}
                />
              </Container>
            </CustomScroll>
          </AppScreenBackground.Body>
        </>
      )}
    </AppScreenBackground>
  );
};

export default EventDetailScreen;

const styles = StyleSheet.create({});
