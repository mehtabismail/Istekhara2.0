import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@/hooks';
import {mS} from '@/utils/functions';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface PROPS {
  errorText?: string;
  selectedDate?: string;
  editable?: boolean;
  disableDatePicker?: boolean;
  dateType: 'date' | 'time' | 'datetime' | undefined;
  value: any;
  setValue: ((d: any) => void) | undefined;
  onSubmitEditing?: (e?: any) => void;
}

const DateTimeInput = ({
  value,
  editable,
  setValue,
  errorText,
  selectedDate,
  onSubmitEditing,
  disableDatePicker,
  dateType = 'date',
}: PROPS) => {
  const [show, setShow] = useState(false);
  const {Colors, Layout, Gutters, Fonts} = useTheme();
  return (
    <TouchableOpacity
      style={[Layout.fill]}
      disabled={disableDatePicker}
      onPress={() => (editable ? setShow(true) : null)}>
      <Text
        numberOfLines={1}
        style={[
          Fonts.OpenSans16_Regular_white,
          Layout.fill,
          Gutters.xLittleVPadding,
          Gutters.littleRPadding,
          {
            color: errorText ? Colors.red_FF0000 : Colors.white,
            height: mS(52),
          },
        ]}>
        {selectedDate}
      </Text>
      <DateTimePickerModal
        isVisible={show}
        mode={dateType}
        date={value}
        onConfirm={d => {
          setValue && setValue(d);
          onSubmitEditing && onSubmitEditing();
          setShow(false);
        }}
        onCancel={() => setShow(false)}
      />
    </TouchableOpacity>
  );
};

export default DateTimeInput;

const styles = StyleSheet.create({});
