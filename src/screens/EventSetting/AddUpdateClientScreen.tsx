import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@/hooks';
import AppScreenBackground from '@/components/AppScreenBackground';
import Header from '@/components/Header';
import CustomScroll from '@/components/CustomScroll';
import Input from '@/components/Input/Input';
import {mS} from '@/utils/functions';
import ButtonAdd from '@/components/ButtonAdd';
import Button from '@/components/Button';
import * as Yup from 'yup';
import {toast} from '@/utils/toast';
import {
  useCreateClientMutation,
  useDeleteClientMutation,
  useUpdateClientMutation,
} from '@/services/modules/EventSetting/client';
import InfoModal, {INFO_MODAL} from '@/components/InfoModal';

type PERSON = {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
};

type DATA = {
  clientName: string;
  Persons: PERSON[];
};

type ERROR = {
  clientName: string;
  Persons: {
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
  }[];
};

const AddUpdateClientScreen = ({navigation, route}: any) => {
  const isEdit = route?.params?.isEdit;
  const paramData = route?.params?.item;
  const {Colors, Images, Layout, Fonts, Gutters} = useTheme();
  const [addNewClient] = useCreateClientMutation();
  const [updateClient] = useUpdateClientMutation();
  const [deleteClient] = useDeleteClientMutation();
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState<INFO_MODAL>('');
  const [modalType, setModalType] = useState<'success' | 'delete'>('success');

  const [data, setData] = useState<DATA>({
    clientName: '',
    Persons: [{email: '', first_name: '', last_name: '', phone: ''}],
  });
  const [errors, setErrors] = useState<ERROR>({
    clientName: '',
    Persons: [{email: '', first_name: '', last_name: '', phone: ''}],
  });

  const validationSchema = Yup.object().shape({
    clientName: Yup.string()
      .min(2, 'Client name must be 2 to 25 characters long')
      .max(25, 'Client name must be 2 to 25 characters long')
      .required('Please fill in client name'),
    Persons: Yup.array().of(
      Yup.object().shape({
        email: Yup.string().email('Invalid email address'),
        // .required('Email address is required'),
        first_name: Yup.string()
          .nullable()
          .notRequired()
          .test(
            'is-valid-name',
            'First name must be 2–25 characters.',
            value => {
              if (!value || value.trim() === '') {
                return true; // Skip validation if the field is empty
              }
              return value.trim().length >= 2 && value.trim().length <= 25; // Validate length if a value exists
            },
          ),
        // Yup.string().required('First name is required'),
        last_name: Yup.string()
          .nullable()
          .notRequired()
          .test(
            'is-valid-name',
            'Last name must be 2–25 characters.',
            value => {
              if (!value || value.trim() === '') {
                return true; // Skip validation if the field is empty
              }
              return value.trim().length >= 2 && value.trim().length <= 25; // Validate length if a value exists
            },
          ),
        phone: Yup.string()
          .nullable()
          .test(
            'is-valid-phone',
            'Please enter a valid phone number',
            value => {
              if (!value || value.trim() === '') {
                return true;
              }
              return /^\+[1-9]\d{9,12}$/.test(value);
            },
          ),
      }),
    ),
  });

  const deleteClientMethod = () => {
    setIsLoading(true);
    deleteClient({
      _id: paramData?._id,
    }).then(res => {
      setIsLoading(false);
      if (res?.data?.message) {
        setModalType('delete');
        setShowModal('success');
      }
    });
  };

  const submit = () => {
    setIsLoading(true);
    if (isEdit) {
      updateClient({
        payload: {
          name: data?.clientName,
          contact_persons: data?.Persons,
        },
        _id: paramData?._id,
      }).then(res => {
        setIsLoading(false);
        if (res?.data?.message) {
          setShowModal('success');
        }
      });
    } else {
      addNewClient({
        payload: {
          name: data?.clientName,
          contact_persons: data?.Persons,
        },
      }).then(res => {
        setIsLoading(false);
        if (res?.data?.client) {
          setShowModal('success');
        }
      });
    }
  };

  const removePress = (ind: number) => {
    setData(prevData => ({
      ...prevData,
      Persons: prevData.Persons.filter((_, index) => index !== ind),
    }));
    setErrors(prevData => ({
      ...prevData,
      Persons: prevData.Persons.filter((_, index) => index !== ind),
    }));
  };

  const addMorePress = () => {
    const newPerson = {
      email: '',
      first_name: '',
      last_name: '',
      phone: '',
    };
    const newErrObj = {
      email: '',
      first_name: '',
      last_name: '',
      phone: '',
    };
    setData(prevData => ({
      ...prevData,
      Persons: [...prevData.Persons, newPerson],
    }));
    setErrors(prevData => ({
      ...prevData,
      Persons: [...prevData.Persons, newErrObj],
    }));
  };

  const validate = async () => {
    Keyboard.dismiss();
    try {
      await validationSchema.validate(data, {
        abortEarly: false,
      });
      submit();
    } catch (error: any) {
      const newErrors: any = {
        clientName: '',
        Persons: data.Persons.map(() => ({
          email: '',
          first_name: '',
          last_name: '',
          phone: '',
        })),
      };
      error.inner.forEach((validationError: any) => {
        const path = validationError.path;
        const message = validationError.message;
        if (path.startsWith('Persons[')) {
          // Extract the index and field name from the path (e.g., "Persons[0].email")
          const match = path.match(/Persons\[(\d+)\]\.(\w+)/);
          if (match) {
            const index = parseInt(match[1], 10);
            const fieldName = match[2];
            newErrors.Persons[index][fieldName] = message;
          }
        } else {
          newErrors[path] = message;
        }
      });
      setErrors(newErrors);
      toast.error('Please fill the form properly!');
    }
  };

  const isDataComplete = (data: DATA) => {
    if (!data.clientName.trim()) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (isDataComplete(data)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [data]);

  useEffect(() => {
    if (isEdit && paramData) {
      setData({
        clientName: paramData?.name,
        Persons: paramData?.contact_persons,
      });
    }
  }, []);

  return (
    <AppScreenBackground>
      {showModal == 'success' ? (
        <InfoModal>
          <InfoModal.Success
            icon={modalType == 'delete' ? 'delete' : 'thumb'}
            onPress={() => navigation.goBack()}>
            <Text
              style={[
                Fonts.OpenSans20_Regular_DBDBDB,
                Fonts.textCenter,
                {color: Colors.blackPrimary_111111},
              ]}>
              {isEdit && modalType == 'delete'
                ? 'You have successfully deleted '
                : isEdit
                ? 'You have successfully updated the details for '
                : 'You have successfully created a client '}
              <Text style={[Fonts.OpenSans20_Bold_111111]}>
                {data.clientName + '.'}
              </Text>
            </Text>
          </InfoModal.Success>
        </InfoModal>
      ) : showModal == 'confirmation' ? (
        <InfoModal>
          <InfoModal.Confirmation
            messageText="Are you sure you want to delete "
            highlightText={data?.clientName + '?'}
            cancelPress={() => setShowModal('')}
            yesPress={deleteClientMethod}
            isLoading={isLoading}
          />
        </InfoModal>
      ) : (
        <>
          <AppScreenBackground.Header backPress={() => navigation.goBack()}>
            Clients
          </AppScreenBackground.Header>
          <AppScreenBackground.Body>
            <CustomScroll contentContainerStyle={[Gutters.regularHPadding]}>
              <View style={[Gutters.xSmallHPadding, Gutters.tinyTPadding]}>
                <Input
                  editable={!isLoading}
                  title="Client Name:"
                  mode="light"
                  type="text"
                  returnKeyType="done"
                  value={data.clientName}
                  setValue={(t: string) => setData({...data, clientName: t})}
                  errorText={errors?.clientName}
                  onFocus={() => setErrors({...errors, clientName: ''})}
                />
              </View>
              <Header.Section
                title="Contact Person"
                iconHeight={mS(19)}
                iconWidth={mS(19)}
                Icon={Images.svgIcon.userProfile}
                containerStyle={[Gutters.littleBMargin]}
              />
              <View style={[Gutters.xSmallHPadding, Gutters.tinyTPadding]}>
                {data?.Persons?.map((item: PERSON, index: number) => {
                  return (
                    <View key={index}>
                      {index > 0 && (
                        <View
                          style={[
                            Gutters.smallTMargin,
                            Gutters.littleTPadding,
                            {
                              borderTopWidth: mS(1),
                              borderTopColor: Colors.gray_DBDBDB,
                            },
                          ]}>
                          <ButtonAdd.Round
                            type="close"
                            size={26}
                            onPress={() => removePress(index)}
                            containerStyle={[Layout.selfEnd]}
                          />
                        </View>
                      )}
                      <View
                        style={[
                          Layout.rowHCenter,
                          Layout.fill,
                          Layout.alignItemsStart,
                        ]}>
                        <Input
                          editable={!isLoading}
                          title="First Name:"
                          mode="light"
                          type="text"
                          returnKeyType="done"
                          containerStyle={[Gutters.tinyRMargin]}
                          value={data?.Persons[index]?.first_name}
                          setValue={(t: string) => {
                            setData(prevData => ({
                              ...prevData,
                              Persons: prevData.Persons.map((person, ind) =>
                                ind === index
                                  ? {...person, first_name: t}
                                  : person,
                              ),
                            }));
                          }}
                          errorText={errors?.Persons[index]?.first_name}
                          onFocus={() => {
                            setErrors(prevData => ({
                              ...prevData,
                              Persons: prevData.Persons.map((person, ind) =>
                                ind === index
                                  ? {...person, first_name: ''}
                                  : person,
                              ),
                            }));
                          }}
                        />
                        <Input
                          editable={!isLoading}
                          title="Last Name:"
                          mode="light"
                          type="text"
                          returnKeyType="done"
                          containerStyle={[Gutters.tinyLMargin]}
                          value={data?.Persons[index]?.last_name}
                          setValue={(t: string) => {
                            setData(prevData => ({
                              ...prevData,
                              Persons: prevData.Persons.map((person, ind) =>
                                ind === index
                                  ? {...person, last_name: t}
                                  : person,
                              ),
                            }));
                          }}
                          errorText={errors?.Persons[index]?.last_name}
                          onFocus={() => {
                            setErrors(prevData => ({
                              ...prevData,
                              Persons: prevData.Persons.map((person, ind) =>
                                ind === index
                                  ? {...person, last_name: ''}
                                  : person,
                              ),
                            }));
                          }}
                        />
                      </View>
                      <Input
                        editable={!isLoading}
                        title="Mobile Number:"
                        mode="light"
                        type="text"
                        returnKeyType="done"
                        keyboardType="phone-pad"
                        value={data?.Persons[index]?.phone}
                        setValue={(t: any) => {
                          if (!data.Persons[index].phone) {
                            setData(prevData => ({
                              ...prevData,
                              Persons: prevData.Persons.map((person, ind) =>
                                ind === index
                                  ? {...person, phone: t == '+' ? t : '+' + t}
                                  : person,
                              ),
                            }));
                          } else {
                            setData(prevData => ({
                              ...prevData,
                              Persons: prevData.Persons.map((person, ind) =>
                                ind === index ? {...person, phone: t} : person,
                              ),
                            }));
                          }
                        }}
                        errorText={errors?.Persons[index]?.phone}
                        onFocus={() => {
                          setErrors(prevData => ({
                            ...prevData,
                            Persons: prevData.Persons.map((person, ind) =>
                              ind === index ? {...person, phone: ''} : person,
                            ),
                          }));
                        }}
                      />
                      <Input
                        editable={!isLoading}
                        title="Email:"
                        mode="light"
                        type="text"
                        returnKeyType="done"
                        keyboardType="email-address"
                        value={data?.Persons[index]?.email}
                        setValue={(t: string) => {
                          setData(prevData => ({
                            ...prevData,
                            Persons: prevData.Persons.map((person, ind) =>
                              ind === index ? {...person, email: t} : person,
                            ),
                          }));
                        }}
                        errorText={errors?.Persons[index]?.email}
                        onFocus={() => {
                          setErrors(prevData => ({
                            ...prevData,
                            Persons: prevData.Persons.map((person, ind) =>
                              ind === index ? {...person, email: ''} : person,
                            ),
                          }));
                        }}
                      />
                    </View>
                  );
                })}
                {data?.Persons?.length < 5 && (
                  <View
                    style={[
                      Layout.rowHCenter,
                      Layout.justifyContentEnd,
                      Gutters.littleVMargin,
                    ]}>
                    <Text
                      style={[
                        Fonts.OpenSans12_Regular_111111,
                        Gutters.littleRMargin,
                        {color: Colors.gray_707070},
                      ]}>
                      Add more contact person (up to 5 max)
                    </Text>
                    <ButtonAdd.Round
                      size={26}
                      type="add"
                      onPress={addMorePress}
                    />
                  </View>
                )}
                <Button
                  varient={isValid ? 'border_dark_111111' : 'disabled_light'}
                  title={isEdit ? 'UPDATE INFORMATION' : 'ADD CLIENT'}
                  loading={isLoading}
                  containerStyle={[Gutters.smallTMargin, Gutters.littleBMargin]}
                  onPress={validate}
                />
                {isEdit && (
                  <Button
                    varient="red_FF0000"
                    title="Delete client"
                    disabled={isLoading}
                    // loading={isLoading}
                    containerStyle={[Gutters.littleBMargin]}
                    onPress={() => setShowModal('confirmation')}
                  />
                )}
              </View>
            </CustomScroll>
          </AppScreenBackground.Body>
        </>
      )}
    </AppScreenBackground>
  );
};

export default AddUpdateClientScreen;

const styles = StyleSheet.create({});
