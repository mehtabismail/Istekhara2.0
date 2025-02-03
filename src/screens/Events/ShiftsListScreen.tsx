import {
  BackHandler,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppScreenBackground from '@/components/AppScreenBackground';
import ButtonRectengular from '@/components/ButtonRectengular';
import {useTheme} from '@/hooks';
import {Box, Row} from '@/components/UI/Layout';
import RowCard from '@/components/RowCard/RowCard';
import {useLazyGetEventShiftsQuery} from '@/services/modules/Events/shift';
import {useAppSelector} from '@/store';
import Loader from '@/components/Loader';
import {FlashList} from '@shopify/flash-list';
import EmptyListComponent from '@/components/EmptyListComponent';
import moment from 'moment';
import {getStringWithCount} from '@/utils/functions';

const ShiftsListScreen = ({navigation, route}: any) => {
  const {Fonts} = useTheme();
  const {selectedEvent, eventShifts} = useAppSelector(state => state.events);
  const isCreateEvent = route?.params?.isCreateEvent;
  const [getEventsShif] = useLazyGetEventShiftsQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    getEventsShif({
      params: {
        event: selectedEvent?.event?._id,
      },
    }).then(res => {
      setRefreshing(false);
    });
  };

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

  useEffect(() => {
    setIsLoading(true);
    getEventsShif({
      params: {
        event: selectedEvent?.event?._id,
      },
    }).then(res => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <AppScreenBackground>
        <Loader />
      </AppScreenBackground>
    );
  }

  return (
    <AppScreenBackground>
      <AppScreenBackground.Header
        backPress={() => {
          if (isCreateEvent) {
            navigation.pop(3);
          } else {
            navigation?.goBack();
          }
        }}
        subTilte={selectedEvent?.event?.venue?.name}
        rightItem={
          selectedEvent?.event?.status !== 'completed' && (
            <ButtonRectengular
              onPress={() => navigation.navigate('AddNewShiftScreen')}
              title="Add New Shift"
            />
          )
        }>
        {selectedEvent?.event?.name}
      </AppScreenBackground.Header>

      <AppScreenBackground.Body>
        <Box border="Bottom" spacing="xSmall" vertical="small">
          <Row justify="between" align="center">
            <Text style={[Fonts.OpenSans20_Bold_111111, Fonts.gray707070]}>
              Shifts
            </Text>
            <Text style={[Fonts.OpenSans14_Regular_DBDBDB, Fonts.black_111111]}>
              {getStringWithCount(eventShifts?.length, 'Shift')}
            </Text>
          </Row>
        </Box>
        <FlashList
          data={eventShifts}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={EmptyListComponent}
          estimatedItemSize={200}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) => {
            return (
              <RowCard.ShiftDetail
                onPress={() =>
                  navigation.navigate('TeamsListScreen', {_id: item?._id})
                }
                title={item?.name}
                status={item?.status}
                date={moment(item?.date).format('DD MMMM YYYY')}
                time={`${item?.start_time} - ${item?.end_time}`}
              />
            );
          }}
        />
      </AppScreenBackground.Body>
    </AppScreenBackground>
  );
};

export default ShiftsListScreen;

const styles = StyleSheet.create({});
