import {Keyboard, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomScroll from '@/components/CustomScroll';
import Input from '@/components/Input/Input';
import {useTheme} from '@/hooks';
import moment from 'moment';
import DatePickerComponent from './DatePickerComponent';
import {useAppSelector} from '@/store';
import {formatToDropDownArray} from '@/utils/functions';
import * as Yup from 'yup';
import {toast} from '@/utils/toast';
import Button from '@/components/Button';
import {useNavigation} from '@react-navigation/native';
import {
  useCreateEventMutation,
  useUpdateEventMutation,
} from '@/services/modules/Events/events';

interface PROPS {
  showDatePicker: boolean;
  edit?: boolean;
  editData?: any;
  createdEvent?: any;
  editEvent?: boolean;
  setEditEvent?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
  setCreatedEvent?: React.Dispatch<React.SetStateAction<any>>;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  setTab?: React.Dispatch<React.SetStateAction<string>>;
}

export type DATA = {
  name: string;
  client: any;
  venue: any;
  description: string;
  time_slots: {
    date: string;
  }[];
  information: string;
};

type REFS = {
  name: TextInput | null;
  client: any;
  venue: any;
  description: TextInput | null;
  time_slots: any;
  information: TextInput | null;
};

export type ERROR = {
  name: string;
  client: string;
  description: string;
  venue: string;
  time_slots: string;
  information: string;
};

const AddEvent = ({
  setShowDatePicker,
  showDatePicker,
  setCreatedEvent,
  setEditEvent,
  edit,
  createdEvent,
  editEvent,
  editData,
  setStep,
  setTab,
}: PROPS) => {
  const {Gutters} = useTheme();
  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const {clients, venues} = useAppSelector(state => state.common);
  const {goBack} = useNavigation();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DATA>({
    name: '',
    client: {},
    description: '',
    venue: {},
    time_slots: [],
    information: '',
  });

  // console.log('alldlldd', JSON.stringify(createdEvent));

  const refs = useRef<REFS>({
    name: null,
    client: null,
    description: null,
    venue: null,
    time_slots: null,
    information: null,
  });

  const [errors, setErrors] = useState<ERROR>({
    name: '',
    client: '',
    description: '',
    venue: '',
    time_slots: '',
    information: '',
  });

  const validationSchema = Yup.object({
    name: Yup.string().required('Please fill in event name'),
    // client: Yup.object().required('Event client is required'),
    client: Yup.object()
      .required('CEvent client is required') // Ensures it's not null or undefined
      .test(
        'is-object',
        'Event client is required',
        value => typeof value === 'object' && value._id,
      ),
    description: Yup.string()
      .nullable()
      .notRequired()
      .test(
        'is-valid-description',
        'Description must be at least 2 characters',
        value => {
          if (!value || value.trim() === '') {
            return true;
          }
          return value.trim().length >= 2;
        },
      ),
    // venue: Yup.object().required('Event venue is required'),
    venue: Yup.object()
      .required('Event venue is required') // Ensures it's not null or undefined
      .test(
        'is-object',
        'Event venue is required',
        value => typeof value === 'object' && value._id,
      ),
    time_slots: Yup.array()
      .min(1, 'Event date is required')
      .required('Event date is required'),
    information: Yup.string()
      .nullable()
      .notRequired()
      .test(
        'is-valid-information',
        'Information must be at least 2 characters',
        value => {
          if (!value || value.trim() === '') {
            return true;
          }
          return value.trim().length >= 2;
        },
      ),
  });

  const submit = () => {
    setIsLoading(true);
    if (edit) {
      updateEvent({payload: data, _id: editData?._id}).then(res => {
        setIsLoading(false);
        if (res?.data?.event) {
          setStep && setStep(1);
        }
      });
    } else if (editEvent) {
      updateEvent({payload: data, _id: createdEvent?._id}).then(res => {
        setIsLoading(false);
        if (res?.data?.event) {
          setStep && setStep(1);
          setCreatedEvent && setCreatedEvent(res?.data?.event);
          setTab && setTab('shift');
          setEditEvent && setEditEvent(false);
          toast.success(res?.data?.message);
        }
      });
    } else {
      createEvent({payload: data}).then(res => {
        setIsLoading(false);
        if (res?.data?.event) {
          setStep && setStep(1);
          setCreatedEvent && setCreatedEvent(res?.data?.event);
          setTab && setTab('shift');
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

  useEffect(() => {
    checkFormValid();
  }, [data]);

  useEffect(() => {
    if (edit) {
      setData({
        name: editData?.name,
        client: editData?.client,
        description: editData?.description,
        venue: editData?.venue,
        time_slots: editData?.time_slots,
        information: editData?.information,
      });
    }
    if (editEvent) {
      setData({
        name: createdEvent?.name,
        client: {_id: createdEvent?.client},
        description: createdEvent?.description,
        venue: {_id: createdEvent?.venue},
        time_slots: createdEvent?.time_slots,
        information: createdEvent?.information,
      });
    }
  }, []);

  if (showDatePicker) {
    return (
      <DatePickerComponent
        data={data}
        setData={setData}
        setShowDatePicker={setShowDatePicker}
      />
    );
  }
  return (
    <CustomScroll contentContainerStyle={[Gutters.extraLargeHPadding]}>
      <Input
        type="text"
        mode="light"
        title="Event Name"
        returnKeyType="done"
        maxLength={25}
        editable={!isLoading}
        value={data.name}
        ref={el => (refs.current.name = el)}
        setValue={t => setData({...data, name: t})}
        errorText={errors.name}
        onFocus={() => setErrors({...errors, name: ''})}
      />

      <Input
        type="dropdown"
        mode="light"
        title="Client"
        editable={!isLoading}
        value={data?.client?._id}
        setValue={(t: any) => {
          setData({...data, client: t?.data});
        }}
        dropdownSearch
        dropdownData={formatToDropDownArray(clients, 'name', '_id')}
        errorText={errors.client}
        onFocus={() => {
          setErrors({...errors, client: ''});
          Keyboard.dismiss();
        }}
      />
      <Input
        multiline
        numberOfLines={5}
        type="text"
        mode="light"
        title="Description"
        returnKeyType="done"
        editable={!isLoading}
        value={data.description}
        setValue={t => setData({...data, description: t})}
        errorText={errors.description}
        onFocus={() => setErrors({...errors, description: ''})}
      />
      <Input
        type="dropdown"
        mode="light"
        title="Venue"
        dropdownSearch
        editable={!isLoading}
        value={data?.venue?._id}
        setValue={(t: any) => {
          setData({...data, venue: t?.data});
        }}
        dropdownData={formatToDropDownArray(venues, 'name', '_id')}
        errorText={errors.venue}
        onFocus={() => {
          setErrors({...errors, venue: ''});
          Keyboard.dismiss();
        }}
      />
      <Input
        disableDatePicker
        type="dateTime"
        mode="light"
        title="Date/s"
        editable={!isLoading}
        selectedDate={
          data?.time_slots?.length > 0 &&
          data.time_slots.map(v => `${moment(v.date).format('DD/MM/YYYY')}, `)
        }
        disablePress={isLoading}
        onInputPress={() => {
          setShowDatePicker(true);
          setErrors({...errors, time_slots: ''});
        }}
        errorText={errors.time_slots}
      />
      <Input
        type="text"
        mode="light"
        title="Other Information"
        returnKeyType="done"
        multiline
        editable={!isLoading}
        numberOfLines={4}
        value={data.information}
        setValue={t => setData({...data, information: t})}
        errorText={errors.information}
        onFocus={() => setErrors({...errors, information: ''})}
      />

      <Button
        title={edit ? 'update' : 'continue to add shift'}
        onPress={validateData}
        loading={isLoading}
        varient={isFormValid ? 'border_dark_111111' : 'disabled_light'}
        containerStyle={[Gutters.littleVMargin]}
      />
      <Button
        title="cancel"
        varient="gray_DBDBDB"
        disabled={isLoading}
        onPress={() => goBack()}
        containerStyle={[Gutters.tinyTMargin, Gutters.littleBMargin]}
      />
    </CustomScroll>
  );
};

export default AddEvent;

const styles = StyleSheet.create({});
