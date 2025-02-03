import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomScroll from '@/components/CustomScroll';
import {useTheme} from '@/hooks';
import Input from '@/components/Input/Input';
import ListSelectionModal, {
  listModalType,
} from '@/screens/Events/_components/ListSelectionModal';
import Button from '@/components/Button';
import ButtonAdd from '@/components/ButtonAdd';
import {isNumberString} from '@/utils/functions';
import {useAppSelector} from '@/store';
import * as Yup from 'yup';
import {toast} from '@/utils/toast';
import {useCreateTeamMutation} from '@/services/modules/Events/team';
import {useNavigation} from '@react-navigation/native';

interface PROPS {
  createdEvent: any;
  createdShift: any;
  setStep: any;
  addNewTeam?: boolean;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  setEditShift: React.Dispatch<React.SetStateAction<boolean>>;
  setCreatedTeam?: React.Dispatch<React.SetStateAction<any>>;
  setLoginModal: React.Dispatch<React.SetStateAction<string>>;
}

export type DATA = {
  name: string;
  event_id: string;
  shift: string;
  members: any[];
  limit: string;
}[];

type ERRORS = {
  name: string;
  members: string;
  limit: string;
}[];

const AddTeams = ({
  createdEvent,
  createdShift,
  setStep,
  addNewTeam,
  setEditShift,
  setCreatedTeam,
  setTab,
  setLoginModal,
}: PROPS) => {
  const {Layout, Gutters, Colors, Fonts} = useTheme();
  const [createTeam] = useCreateTeamMutation();
  const {goBack} = useNavigation();
  const {users} = useAppSelector(state => state.common);
  const listRef = useRef<listModalType>(null);
  const [listIndex, setListIndex] = useState<number | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DATA>([
    {
      event_id: '',
      limit: '',
      members: [],
      name: '',
      shift: '',
    },
  ]);

  const [errors, setErrors] = useState<ERRORS>([
    {
      name: '',
      limit: '',
      members: '',
    },
  ]);

  const transformedArray = data.map(group => ({
    name: group?.name,
    event_id: group?.event_id,
    shift: group?.shift,
    members: group?.members?.map(member => ({user: member?._id})),
    limit: group?.limit,
  }));

  const handleDelete = (index: number) => {
    let updatedData = data?.filter((val, ind) => ind !== index);
    if (updatedData?.length == 0) {
      setData([
        {
          event_id: '',
          limit: '',
          members: [],
          name: '',
          shift: '',
        },
      ]);
    } else {
      setData(updatedData);
    }
  };

  const addMoreTeam = () => {
    setData([
      ...data,
      {
        event_id: createdEvent?._id,
        limit: '',
        members: [],
        name: '',
        shift: createdShift?._id,
      },
    ]);
  };

  const validationSchema = Yup.array().of(
    Yup.object().shape({
      limit: Yup.string().required('Limit must be a positive integer.'),
      name: Yup.string().required('Team name is required.'),
      members: Yup.array()
        .min(1, 'At least one member must be selected.')
        .required('At least one member must be selected.'),
    }),
  );

  const handleBack = () => {
    if (addNewTeam) {
      goBack();
    } else {
      setStep(1);
      setTab('shift');
      setEditShift(true);
    }
  };

  const submit = async () => {
    setIsLoading(true);
    await createTeam({payload: transformedArray}).then(res => {
      setIsLoading(false);
      if (res?.data?.url) {
        setStep(3);
        setLoginModal(res?.data?.url);
      } else if (res?.data?.team) {
        setStep(3);
        setCreatedTeam && setCreatedTeam(res?.data?.team);
      }
    });
  };

  const validateData = async () => {
    Keyboard.dismiss();
    try {
      await validationSchema.validate(data, {
        abortEarly: false,
      });
      submit();
    } catch (error: any) {
      const formattedErrors: any = data.map(() => ({
        name: '',
        members: '',
        limit: '',
      }));
      error.inner.forEach((err: any) => {
        const path = err.path || '';
        const match = path.match(/\[(\d+)]\.(\w+)/);
        if (match) {
          const index = parseInt(match[1], 10);
          const field = match[2];
          if (formattedErrors[index] && field in formattedErrors[index]) {
            formattedErrors[index][field] = err.message;
          }
        }
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
    setData([
      {
        event_id: createdEvent?._id,
        limit: '',
        members: [],
        name: '',
        shift: createdShift?._id,
      },
    ]);
  }, []);

  return (
    <CustomScroll contentContainerStyle={[]}>
      <View>
        {data.map((item, ind) => {
          return (
            <View key={ind}>
              <View style={[Gutters.extraLargeHPadding]}>
                <Input
                  type="text"
                  mode="light"
                  title="Team Name"
                  returnKeyType="default"
                  maxLength={25}
                  value={item?.name}
                  setValue={(t: string) => {
                    setData(prevData => {
                      const updatedData = [...prevData];
                      if (updatedData[ind]) {
                        updatedData[ind] = {...updatedData[ind], name: t};
                      }
                      return updatedData;
                    });
                  }}
                  editable={!isLoading}
                  errorText={errors[ind]?.name}
                  onFocus={() =>
                    setErrors(prevData => {
                      const updatedData = [...prevData];
                      if (updatedData[ind]) {
                        updatedData[ind] = {...updatedData[ind], name: ''};
                      }
                      return updatedData;
                    })
                  }
                />
                <Input
                  type="text"
                  mode="light"
                  title="Member Needed (Number)"
                  returnKeyType="default"
                  keyboardType="number-pad"
                  value={item?.limit}
                  setValue={(t: string) => {
                    setData(prevData => {
                      const updatedData = [...prevData];
                      if (updatedData[ind]) {
                        updatedData[ind] = {
                          ...updatedData[ind],
                          limit: isNumberString(t) ? t : '',
                          members: [],
                        };
                      }
                      return updatedData;
                    });
                  }}
                  editable={!isLoading}
                  errorText={errors[ind]?.limit}
                  onFocus={() =>
                    setErrors(prevData => {
                      const updatedData = [...prevData];
                      if (updatedData[ind]) {
                        updatedData[ind] = {...updatedData[ind], limit: ''};
                      }
                      return updatedData;
                    })
                  }
                  // value={data.name}
                  // setValue={t => setData({...data, name: t})}
                  // errorText={errors.name}
                  // onFocus={() => setErrors({...errors, name: ''})}
                />
                {item?.members?.length == 0 && (
                  <Input
                    type="text"
                    mode="light"
                    title="Member List"
                    returnKeyType="default"
                    onInputPress={() => {
                      if (item?.limit > 0) {
                        listRef.current?.show();
                        setListIndex(ind);
                      }
                      Keyboard.dismiss();
                      setErrors(prevData => {
                        const updatedData = [...prevData];
                        if (updatedData[ind]) {
                          updatedData[ind] = {...updatedData[ind], members: ''};
                        }
                        return updatedData;
                      });
                    }}
                    editable={false}
                    pointerEvents="none"
                    value={item?.members?.length > 0 ? 'Select Member' : ''}
                    errorText={errors[ind]?.members}
                  />
                )}
                {item?.members?.length > 0 && (
                  <View style={[Gutters.littleTMargin]}>
                    <Text
                      style={[
                        Fonts.OpenSans14_Regular_DBDBDB,
                        {color: Colors.blackPrimary_111111},
                      ]}>
                      Memer List
                    </Text>
                    <View
                      style={[Layout.rowBetweenCenter, Gutters.littleTMargin]}>
                      <ButtonAdd.Rectangular
                        disabled={isLoading}
                        variant="yellow"
                        title={`   ${item?.members?.length} Added   `}
                        onPress={() => {
                          listRef.current?.show();
                          setListIndex(ind);
                          Keyboard.dismiss();
                        }}
                      />
                      <ButtonAdd.Rectangular
                        disabled={isLoading}
                        variant="red"
                        title={'Delete Team'}
                        onPress={() => handleDelete(ind)}
                      />
                    </View>
                  </View>
                )}
              </View>
              <View
                style={[
                  Gutters.smallBPadding,
                  Gutters.smallBMargin,
                  {
                    borderBottomColor: Colors.gray_DBDBDB,
                    borderBottomWidth: 1,
                  },
                ]}
              />
              {item?.members?.length > 0 && data?.length - 1 == ind && (
                <ButtonAdd.Rectangular
                  disabled={isLoading}
                  variant="yellow"
                  title={`+ Add another Team`}
                  onPress={addMoreTeam}
                  containerStyle={[Gutters.smallBMargin]}
                />
              )}
            </View>
          );
        })}

        <View style={[Gutters.extraLargeHPadding]}>
          <Button
            title={addNewTeam ? 'add teams' : 'Finish'}
            onPress={validateData}
            varient={isFormValid ? 'border_dark_111111' : 'disabled_light'}
            loading={isLoading}
            containerStyle={[Gutters.littleVMargin]}
          />
          <Button
            title={addNewTeam ? 'cancel' : 'back'}
            varient="gray_DBDBDB"
            disabled={isLoading}
            onPress={handleBack}
            containerStyle={[Gutters.tinyTMargin, Gutters.littleBMargin]}
          />
        </View>

        <ListSelectionModal
          data={data}
          setData={setData}
          listIndex={listIndex}
          listData={users}
          ref={listRef}
        />
      </View>
    </CustomScroll>
  );
};

export default AddTeams;

const styles = StyleSheet.create({});
