import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@/hooks';
import AppScreenBackground from '@/components/AppScreenBackground';
import Input from '@/components/Input/Input';
import {Container} from '@/components/UI/Layout';
import Button from '@/components/Button';
import * as Yup from 'yup';
import CustomScroll from '@/components/CustomScroll';
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from '@/services/modules/Events/team';
import {useAppSelector} from '@/store';
import InfoModal, {INFO_MODAL} from '@/components/InfoModal';

export type ERROR = {
  name: string;
};

const AddTaskScreen = ({navigation, route}: any) => {
  const {Gutters, Fonts, Colors, Layout} = useTheme();
  const isEdit = route?.params?.isEdit;
  const task = route?.params?.task;
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const selectedTeam = useAppSelector(state => state.events.selectedTeam);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showModal, setShowModal] = useState<INFO_MODAL>('');
  const [createdTask, setCreatedTask] = useState<any>({});
  const [data, setData] = useState({
    name: '',
  });
  const [errors, setErrors] = useState<ERROR>({
    name: '',
  });

  const validationSchema = Yup.object({
    name: Yup.string().min(2).required('Task Name is required'),
  });

  const submitData = () => {
    setIsLoading(true);
    if (isEdit) {
      updateTask({
        _id: task?._id,
        payload: {name: data.name},
      }).then(res => {
        setIsLoading(false);
        if (res?.data?.item) {
          setCreatedTask(res?.data?.item);
          setShowModal('success');
        }
      });
    } else {
      createTask({payload: {name: data.name, team: selectedTeam?._id}}).then(
        res => {
          setIsLoading(false);
          if (res?.data?.task) {
            setCreatedTask(res?.data?.task);
            setShowModal('success');
          }
        },
      );
    }
  };

  const validateData = async () => {
    Keyboard.dismiss();
    try {
      await validationSchema.validate(data, {
        abortEarly: false,
      });
      submitData();
    } catch (error: any) {
      const formattedErrors: any = {};
      error.inner.forEach((error: any) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
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
    if (isEdit) {
      setData({
        name: task?.name,
      });
    }
  }, []);

  return (
    <AppScreenBackground>
      {showModal == 'success' ? (
        <InfoModal>
          <InfoModal.Success onPress={() => navigation?.goBack()}>
            <Text
              style={[
                Fonts.OpenSans20_Regular_DBDBDB,
                Fonts.textCenter,
                {color: Colors.blackPrimary_111111},
              ]}>
              {isEdit
                ? 'You have successfully updated Task: '
                : 'You have successfully added Task: '}

              <Text style={[Fonts.OpenSans20_Bold_111111]}>
                {createdTask?.name + '.'}
              </Text>
            </Text>
          </InfoModal.Success>
        </InfoModal>
      ) : (
        <>
          <AppScreenBackground.Header backPress={() => navigation.goBack()}>
            Add Task
          </AppScreenBackground.Header>
          <AppScreenBackground.Body>
            <CustomScroll
              contentContainerStyle={[
                Gutters.extraLargeHPadding,
                Gutters.littleTMargin,
              ]}>
              <Input
                type="text"
                mode="light"
                title="Task Name"
                returnKeyType="done"
                maxLength={25}
                editable={!isLoading}
                value={data.name}
                setValue={t => setData({...data, name: t})}
                errorText={errors.name}
                onFocus={() => setErrors({...errors, name: ''})}
              />

              <Button
                title={isEdit ? 'update' : 'ADD TASK'}
                onPress={validateData}
                loading={isLoading}
                varient={isFormValid ? 'border_dark_111111' : 'disabled_light'}
                containerStyle={[Gutters.littleVMargin]}
              />
              <Button
                title="back"
                varient="gray_DBDBDB"
                disabled={isLoading}
                onPress={() => navigation.goBack()}
                containerStyle={[Gutters.tinyTMargin, Gutters.littleBMargin]}
              />
            </CustomScroll>
          </AppScreenBackground.Body>
        </>
      )}
    </AppScreenBackground>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({});
