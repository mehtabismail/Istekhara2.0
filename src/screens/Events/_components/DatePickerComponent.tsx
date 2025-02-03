import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Input from '@/components/Input/Input';
import CustomScroll from '@/components/CustomScroll';
import {useTheme} from '@/hooks';
import {getApiFormattedDate, mS} from '@/utils/functions';
import ButtonAdd from '@/components/ButtonAdd';
import {DATA} from './AddEvent';
import CalendarComponent from '@/components/CalendarComponent';
import moment from 'moment';
import {toast} from '@/utils/toast';
import Button from '@/components/Button';

interface PROPS {
  data: DATA;
  setData: React.Dispatch<React.SetStateAction<DATA>>;
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
}

const DatePickerComponent = ({data, setData, setShowDatePicker}: PROPS) => {
  const {Layout, Gutters, Colors, Fonts, Images} = useTheme();
  const [markedDates, setMarkedDates] = useState<any>(null);
  const [calendar, setCalendar] = useState(false);

  const handleDayPress = (d: any) => {
    if (
      data?.time_slots?.some(
        item => moment(item.date).format('YYYY-MM-DD') == d?.dateString,
      )
    ) {
      setCalendar(false);
    } else {
      let slots = [
        ...data?.time_slots,
        {date: moment.utc(d?.dateString).toISOString()},
      ];
      setData({...data, time_slots: slots});
      setCalendar(false);
    }
  };

  const handleDelete = ind => {
    let newArr = data?.time_slots?.filter((val, index) => index !== ind && val);
    setData({...data, time_slots: newArr});
  };

  useEffect(() => {
    const formattedDates = data?.time_slots?.reduce((acc, item) => {
      if (!item.date) {
        return acc;
      }
      const formattedDate = moment(item?.date).format('YYYY-MM-DD');
      acc[formattedDate] = {
        customStyles: {
          container: {
            backgroundColor: '#9D9D9D',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          },
          text: {
            color: '#ffffff',
          },
        },
      };
      return acc;
    }, {});
    setMarkedDates(formattedDates);
  }, [data]);

  return (
    <CustomScroll
      contentContainerStyle={[Gutters.xSmallHPadding, Gutters.littleTPadding]}>
      <Text
        style={[
          Fonts.OpenSans14_Bold_DBDBDB,
          Gutters.regularTMargin,
          Gutters.tinyBMargin,
          {color: Colors.gray_707070},
        ]}>
        Event Date/s
      </Text>
      <View>
        {data?.time_slots?.length > 0 ? (
          data?.time_slots?.map((item, index) => {
            return (
              <View
                key={index}
                style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
                <Input
                  disableDatePicker
                  selectedDate={moment(item?.date).format('DD/MM/YYYY')}
                  type="dateTime"
                  mode="light"
                  containerStyle={{marginTop: mS(-3)}}
                  onInputPress={() => setCalendar(true)}
                />
                <TouchableOpacity
                  onPress={() => handleDelete(index)}
                  style={[Gutters.xSmallLMargin, {marginTop: mS(-10)}]}>
                  <Images.svgIcon.deleteCircle
                    width={mS(24.92)}
                    height={mS(24.92)}
                  />
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <Input
            disableDatePicker
            type="dateTime"
            mode="light"
            onInputPress={() => setCalendar(true)}
          />
        )}
      </View>

      {calendar ? (
        <CalendarComponent
          selectedDate={getApiFormattedDate(new Date())}
          containerStyle={[Gutters.littleTMargin]}
          onDayPress={handleDayPress}
          markedDates={markedDates}
          minDate={moment(new Date()).format('YYYY-MM-DD')}
        />
      ) : (
        <ButtonAdd.Rectangular
          variant="yellow"
          onPress={() => setCalendar(true)}
          title="+ Add Event Date"
          containerStyle={[Gutters.largeTMargin]}
        />
      )}
      <View style={[Layout.fill]} />
      <Button
        disabled={data?.time_slots?.length > 0 ? false : true}
        varient={
          data?.time_slots?.length > 0 ? 'dark_111111' : 'disabled_light'
        }
        containerStyle={[Gutters.xSmallMargin]}
        title="CONFIRM"
        onPress={() => setShowDatePicker(false)}
      />
    </CustomScroll>
  );
};

export default DatePickerComponent;

const styles = StyleSheet.create({});
