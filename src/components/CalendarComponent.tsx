import {StyleProp, StyleSheet, Text, View, ViewProps} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';
import {Calendar} from 'react-native-calendars';
import {Theme, MarkedDates} from 'react-native-calendars/src/types';
import {mS, sWidth} from '@/utils/functions';
import fonts from '@/theme/assets/fonts';

interface PROPS {
  containerStyle?: StyleProp<ViewProps>;
  markedDates?: MarkedDates;
  selectedDate?: string;
  onDayPress?: (day: Date) => void;
  minDate?: string;
}

const CalendarComponent = ({
  containerStyle,
  markedDates,
  selectedDate,
  onDayPress,
  minDate,
}: PROPS) => {
  const {Colors, Fonts, Gutters, Layout} = useTheme();

  return (
    <View style={[containerStyle]}>
      <Calendar
        markingType={'custom'}
        onDayPress={onDayPress}
        minDate={minDate ? minDate : undefined}
        markedDates={
          selectedDate
            ? {
                ...markedDates,
                [selectedDate]: {
                  customStyles: {
                    container: {
                      backgroundColor: Colors.blackPrimary_111111,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                    text: {color: Colors.white},
                  },
                },
              }
            : markedDates
        }
        style={{
          borderRadius: mS(20),
          backgroundColor: Colors.gray_FCFCFC,
          overflow: 'hidden',
          borderWidth: mS(1),
          borderColor: Colors.gray_F2F2F2,
        }}
        theme={
          {
            'stylesheet.calendar.header': {
              dayHeader: {
                marginTop: mS(10),
                marginBottom: mS(15),
                textAlign: 'center',
                fontSize: mS(12),
                fontFamily: fonts.OpenSansBold,
                color: Colors.blackPrimary_111111,
                textTransform: 'uppercase',
              },
            },
            arrowColor: Colors.gray_9D9D9D,
            monthTextColor: Colors.blackPrimary_111111,
            textMonthFontFamily: fonts.OpenSansBold,
            textMonthFontSize: mS(18),
            dayTextColor: Colors.gray_707070,
            textDayFontFamily: fonts.OpenSansRegular,
            textDayFontSize: mS(14),
            textDisabledColor: Colors.gray_DBDBDB,
            todayTextColor: Colors.gray_707070,
          } as Theme
        }
      />

      <View
        style={{
          height: mS(12),
          marginHorizontal: mS(17),
          backgroundColor: Colors.gray_9D9D9D,
          borderBottomLeftRadius: mS(20),
          borderBottomRightRadius: mS(20),
        }}
      />
      <View
        style={[
          {
            marginHorizontal: mS(34),
            height: mS(12),
            backgroundColor: Colors.gray_DBDBDB,
            opacity: 0.66,
            borderBottomLeftRadius: mS(20),
            borderBottomRightRadius: mS(20),
          },
        ]}
      />
    </View>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({});
