import {Keyboard, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomScroll from '@/components/CustomScroll';
import {useTheme} from '@/hooks';
import Input from '@/components/Input/Input';
import {convertTo24Hour, formatToDropDownArray} from '@/utils/functions';
import {ShiftTime} from '@/utils/data';
import Button from '@/components/Button';
import * as Yup from 'yup';
import {toast} from '@/utils/toast';
import {
  useCreateShiftMutation,
  useUpdateShiftMutation,
} from '@/services/modules/Events/shift';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

interface PROPS {
  createdEvent: any;
  editShift: boolean;
  createdShift: any;
  addNewShift?: boolean;
  isCreateEvent?: boolean;
  setCreatedShift: React.Dispatch<React.SetStateAction<any>>;
  setEditEvent: React.Dispatch<React.SetStateAction<boolean>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}
export type ERROR = {
  name: string;
  start_time: string;
  end_time: string;
  date: string;
};

const AddShift = ({
  createdEvent,
  createdShift,
  setCreatedShift,
  setStep,
  setTab,
  editShift,
  addNewShift,
  setEditEvent,
  isCreateEvent,
}: PROPS) => {
  const {Layout, Gutters, Colors, Fonts} = useTheme();
  const [createShift] = useCreateShiftMutation();
  const [updateShift] = useUpdateShiftMutation();
  const {goBack} = useNavigation();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    event_id: '',
    start_time: '',
    end_time: '',
    date: '',
  });

  const currentDate = moment().startOf('day');
  const target = moment(data?.date).startOf('day');

  const [errors, setErrors] = useState<ERROR>({
    name: '',
    start_time: '',
    end_time: '',
    date: '',
  });

  const validationSchema = Yup.object({
    name: Yup.string().required('Shift name is required'),
    date: Yup.string().required('Event date is required'),
    start_time: Yup.string().required('Shift start time is required'),
    end_time: Yup.string().required('Shift end time is required'),
  });

  const handleBack = () => {
    if (addNewShift) {
      goBack();
    } else {
      setStep(0);
      setTab('event');
      setEditEvent(true);
    }
  };

  const submit = () => {
    if (editShift) {
      setIsLoading(true);
      updateShift({payload: data, _id: createdShift?._id}).then(res => {
        setIsLoading(false);
        if (res?.data?.item) {
          setStep(2);
          setCreatedShift(res?.data?.item);
          setTab('teams');
          toast.success(res?.data?.message);
        }
      });
    } else if (addNewShift) {
      setIsLoading(true);
      createShift({payload: data}).then(res => {
        setIsLoading(false);
        if (res?.data?.shift) {
          setStep(1);
          setCreatedShift(res?.data?.shift);
        }
      });
    } else {
      setIsLoading(true);
      createShift({payload: data}).then(res => {
        setIsLoading(false);
        if (res?.data?.shift) {
          setStep(2);
          setCreatedShift(res?.data?.shift);
          setTab('teams');
          toast.success(res?.data?.message);
        }
      });
    }
  };

  const validateData = async () => {
    Keyboard.dismiss();
    try {
      await validationSchema.validate(data, {
        abortEarly: false,
      });
      submit();
    } catch (error: any) {
      const formattedErrors: any = {};
      error.inner.forEach((error: any) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
      toast.error('Please fill the form properly!');
    }
  };
  const checkFormValid = async () => {
    try {
      await validationSchema.validate(data, {
        abortEarly: false,
      });
      setIsFormValid(true);
    } catch (error: any) {
      setIsFormValid(false);
    }
  };

  const getShifStartTime = () => {
    const targetTime = moment().format('hh:mm A');
    if (currentDate.isSame(target)) {
      console.log('yessss', targetTime);
      return ShiftTime.filter(val => {
        if (convertTo24Hour(val.value) > convertTo24Hour(targetTime)) {
          return val;
        }
      });
    } else if (currentDate.isBefore(target)) {
      return ShiftTime;
    } else {
      return [{value: '', label: ''}];
    }
  };

  useEffect(() => {
    checkFormValid();
  }, [data]);

  useEffect(() => {
    if (editShift) {
      setData({
        name: createdShift?.name,
        event_id: createdEvent?._id,
        start_time: createdShift?.start_time,
        end_time: createdShift?.end_time,
        date: createdShift?.date,
      });
    } else {
      setData({
        name: '',
        event_id: createdEvent?._id,
        start_time: '',
        end_time: '',
        date: '',
      });
    }
  }, []);

  return (
    <CustomScroll
      contentContainerStyle={[
        Gutters.extraLargeHPadding,
        addNewShift && Gutters.littleTMargin,
      ]}>
      <View>
        <Input
          type="text"
          mode="light"
          title="Shift Name"
          returnKeyType="default"
          editable={!isLoading}
          value={data.name}
          setValue={t => setData({...data, name: t})}
          errorText={errors.name}
          onFocus={() => setErrors({...errors, name: ''})}
        />
        <Input
          type="dropdown"
          mode="light"
          title="Select Event Date"
          editable={!isLoading}
          dropdownData={formatToDropDownArray(
            createdEvent.time_slots,
            'date',
            'date',
            true,
          )}
          value={data?.date}
          setValue={(t: any) => {
            setData({...data, date: t?.value});
            Platform.OS == 'ios'
              ? setTimeout(() => {
                  Keyboard.dismiss();
                }, 300)
              : Keyboard.dismiss();
          }}
          errorText={errors.date}
          onFocus={() => setErrors({...errors, date: ''})}
        />
        <View style={[Layout.rowHCenter, Layout.fill, Layout.alignItemsStart]}>
          <Input
            type="dropdown"
            mode="light"
            title="Start Time"
            editable={
              currentDate.isAfter(target) || data?.date == '' || isLoading
                ? false
                : true
            }
            dropdownData={getShifStartTime()}
            value={data.start_time}
            setValue={(t: any) => {
              setData({...data, start_time: t?.value, end_time: ''});
              Platform.OS == 'ios'
                ? setTimeout(() => {
                    Keyboard.dismiss();
                  }, 300)
                : Keyboard.dismiss();
            }}
            errorText={errors.start_time}
            onFocus={() => setErrors({...errors, start_time: ''})}
          />
          <View
            style={[
              Layout.selfEnd,
              Gutters.regularBMargin,
              Gutters.littleHPadding,
            ]}>
            <Text style={[Fonts.OpenSans16_SemiBold_111111]}>-</Text>
          </View>
          <Input
            type="dropdown"
            mode="light"
            title="End Time"
            editable={data?.start_time == '' || isLoading ? false : true}
            value={data.end_time}
            dropdownData={ShiftTime.filter((val, ind) => {
              if (
                data?.start_time !== '' &&
                convertTo24Hour(val.value) > convertTo24Hour(data?.start_time)
              ) {
                return val;
              }
            })}
            setValue={(t: any) => {
              setData({...data, end_time: t?.value});
              Platform.OS == 'ios'
                ? setTimeout(() => {
                    Keyboard.dismiss();
                  }, 300)
                : Keyboard.dismiss();
            }}
            errorText={errors.end_time}
            onFocus={() => setErrors({...errors, end_time: ''})}
          />
        </View>
      </View>
      <View style={[Layout.fill]} />
      <Button
        title={addNewShift ? 'ADD SHIFT' : 'continue to add team'}
        onPress={validateData}
        varient={isFormValid ? 'border_dark_111111' : 'disabled_light'}
        loading={isLoading}
        containerStyle={[Gutters.littleVMargin]}
      />
      {!isCreateEvent && (
        <Button
          title={addNewShift ? 'CANCEL' : 'back'}
          varient="gray_DBDBDB"
          disabled={isLoading}
          onPress={handleBack}
          containerStyle={[Gutters.tinyTMargin, Gutters.littleBMargin]}
        />
      )}
    </CustomScroll>
  );
};

export default AddShift;

const styles = StyleSheet.create({});
