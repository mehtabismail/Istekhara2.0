import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppScreenBackground from '@/components/AppScreenBackground';
import {useTheme} from '@/hooks';
import Input from '@/components/Input/Input';
import CustomScroll from '@/components/CustomScroll';
import moment from 'moment';
import {capitalizeWords, mS} from '@/utils/functions';

const CalendarDetails = ({navigation, route}: any) => {
  const {Gutters} = useTheme();
  const item = route?.params?.item;

  const [data, setData] = useState({
    event_name: '',
    shift_name: '',
    date_time: '',
  });
  useEffect(() => {
    setData({
      event_name: capitalizeWords(item?.name),
      shift_name: capitalizeWords(item?.shifts[0]?.name),
      date_time: `${
        item?.shifts[0]?.date
          ? moment(item?.shifts[0]?.date).format('DD/MM/YYYY')
          : 'N/A'
      }, ${
        item?.shifts[0]?.start_time ? item?.shifts[0]?.start_time : '00:00'
      } - ${item?.shifts[0]?.end_time ? item?.shifts[0]?.end_time : '00:00'}`,
    });
  }, []);

  return (
    <AppScreenBackground>
      <AppScreenBackground.Header backPress={() => navigation.goBack()}>
        Calendars
      </AppScreenBackground.Header>
      <AppScreenBackground.Body>
        <CustomScroll contentContainerStyle={[Gutters.regularHPadding]}>
          <View style={[Gutters.xSmallHPadding, Gutters.tinyTPadding]}>
            <Input
              title="Event Name:"
              mode="light"
              type="text"
              returnKeyType="next"
              editable={false}
              value={data.event_name}
            />
            <Input
              title="Shift Name:"
              mode="light"
              type="text"
              returnKeyType="next"
              editable={false}
              value={data.shift_name}
            />
            <Input
              title="Date & Time:"
              mode="light"
              type="text"
              returnKeyType="next"
              editable={false}
              value={data.date_time}
            />
          </View>
        </CustomScroll>
      </AppScreenBackground.Body>
    </AppScreenBackground>
  );
};

export default CalendarDetails;

const styles = StyleSheet.create({});
