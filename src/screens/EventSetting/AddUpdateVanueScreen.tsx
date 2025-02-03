import {Keyboard, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AppScreenBackground from '@/components/AppScreenBackground';
import Header from '@/components/Header';
import CustomScroll from '@/components/CustomScroll';
import {useTheme} from '@/hooks';
import Input from '@/components/Input/Input';
import {isEmailValid, isPhoneValid, mS} from '@/utils/functions';
import Button from '@/components/Button';
import * as Yup from 'yup';
import {
  useCreateVenueMutation,
  useDeleteVenueMutation,
  useUpdateVenueMutation,
} from '@/services/modules/EventSetting/venue';
import InfoModal, {INFO_MODAL} from '@/components/InfoModal';
import {toast} from '@/utils/toast';

type REFS = {
  vanueName: TextInput | null;
  vanueAddress: TextInput | null;
  firstName: TextInput | null;
  lastName: TextInput | null;
  phone: TextInput | null;
  email: TextInput | null;
};
type DATA = {
  vanueName: string;
  vanueAddress: string;
  addressObj: any;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

const AddUpdateVanueScreen = ({navigation, route}: any) => {
  const {Colors, Images, Layout, Fonts, Gutters} = useTheme();
  const [addVenue] = useCreateVenueMutation();
  const [updateVenue] = useUpdateVenueMutation();
  const [deleteVenue] = useDeleteVenueMutation();
  const isEdit = route.params?.isEdit;
  const preData = route.params?.item;
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState<INFO_MODAL>('');
  const [modalType, setModalType] = useState<'success' | 'delete'>('success');
  const [data, setData] = useState<DATA>({
    vanueName: '',
    vanueAddress: '',
    addressObj: null,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const refs = useRef<REFS>({
    vanueName: null,
    vanueAddress: null,
    firstName: null,
    lastName: null,
    phone: null,
    email: null,
  });

  const [errors, setErrors] = useState<{
    vanueName: string;
    vanueAddress: string;
    addressObj: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  }>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    vanueAddress: '',
    addressObj: '',
    vanueName: '',
  });

  const validationSchema = Yup.object({
    vanueName: Yup.string().required('Please fill in venue name'),
    addressObj: Yup.object().required('Please fill in venue address'),
    vanueAddress: Yup.string()
      .required('Please fill in venue address')
      .test(
        'match-formatted-address',
        'Please select a valid address from the dropdown',
        function (value) {
          const {addressObj} = this.parent;
          return value === addressObj?.formatted_address;
        },
      ),
    firstName: Yup.string()
      .nullable()
      .notRequired()
      .test('is-valid-name', 'First name must be 2–25 characters.', value => {
        if (!value || value.trim() === '') {
          return true; // Skip validation if the field is empty
        }
        return value.trim().length >= 2 && value.trim().length <= 25; // Validate length if a value exists
      }),
    // Yup.string().required('First name is required'),
    lastName: Yup.string()
      .nullable()
      .notRequired()
      .test('is-valid-name', 'Last name must be 2–25 characters.', value => {
        if (!value || value.trim() === '') {
          return true; // Skip validation if the field is empty
        }
        return value.trim().length >= 2 && value.trim().length <= 25; // Validate length if a value exists
      }),
    phone: Yup.string()
      .nullable() // Allows null or empty values
      .test('is-valid-phone', 'Invalid phone number', value => {
        if (!value || value.trim() === '') {
          return true; // Skip validation if phone is empty
        }
        return /^\+[1-9]\d{9,14}$/.test(value); // Validate if a phone is provided
      }),
    email: Yup.string().email('Invalid email address'),
  });

  const deleteAction = () => {
    setIsLoading(true);
    deleteVenue({
      _id: preData?._id,
    }).then(res => {
      setIsLoading(false);
      if (res?.data?.message) {
        setModalType('delete');
        setShowModal('success');
      }
    });
  };

  const submit = () => {
    let reqObj = {
      name: data?.vanueName,
      address: data?.addressObj?.formatted_address,
      lattitude: data?.addressObj?.geometry?.location?.lat,
      longitude: data?.addressObj?.geometry?.location?.lng,
      contact_person_first_name: data?.firstName,
      contact_person_last_name: data?.lastName,
      contact_person_phone: data?.phone,
      contact_person_email: data?.email,
    };
    setIsLoading(true);
    if (isEdit) {
      console.log('update==>', isEdit);
      updateVenue({payload: reqObj, _id: preData?._id}).then(res => {
        setIsLoading(false);
        if (res?.data?.item) {
          setShowModal('success');
        }
      });
    } else {
      console.log('addd', isEdit);
      addVenue({
        payload: reqObj,
      }).then(res => {
        setIsLoading(false);
        if (res?.data?.venue) {
          setShowModal('success');
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

  useEffect(() => {
    if (data.vanueName && data.vanueAddress) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [data]);

  useEffect(() => {
    if (isEdit) {
      setData({
        email: preData?.contact_person_email,
        firstName: preData?.contact_person_first_name,
        lastName: preData?.contact_person_last_name,
        phone: preData?.contact_person_phone,
        vanueAddress: preData?.address,
        addressObj: {
          formatted_address: preData?.address,
          geometry: {
            location: {
              lat: preData?.lattitude,
              lng: preData?.longitude,
            },
          },
        },
        vanueName: preData?.name,
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
              {isEdit && modalType == 'delete'
                ? 'You have successfully deleted '
                : isEdit
                ? 'You have successfully updated the details for '
                : 'You have successfully created a venue '}
              <Text style={[Fonts.OpenSans20_Bold_111111]}>
                {data.vanueName + '.'}
              </Text>
            </Text>
          </InfoModal.Success>
        </InfoModal>
      ) : showModal == 'confirmation' ? (
        <InfoModal>
          <InfoModal.Confirmation
            messageText="Are you sure you want to delete "
            highlightText={data?.vanueName + '?'}
            cancelPress={() => setShowModal('')}
            yesPress={deleteAction}
            isLoading={isLoading}
          />
        </InfoModal>
      ) : (
        <>
          <AppScreenBackground.Header backPress={() => navigation.goBack()}>
            Venues
          </AppScreenBackground.Header>
          <AppScreenBackground.Body>
            <CustomScroll contentContainerStyle={[Gutters.regularHPadding]}>
              <Header.Section
                iconWidth={mS(16.4)}
                iconHeight={mS(22.8)}
                title="Venue Details"
                Icon={Images.svgIcon.location}
                containerStyle={[Gutters.littleVMargin]}
              />
              <View style={[Gutters.xSmallHPadding, Gutters.tinyTPadding]}>
                <Input
                  title="Venue Name:"
                  mode="light"
                  type="text"
                  returnKeyType="next"
                  editable={!isLoading}
                  value={data.vanueName}
                  setValue={(t: string) => setData({...data, vanueName: t})}
                  ref={el => (refs.current.vanueName = el)}
                  onSubmitEditing={() => refs.current.vanueAddress?.focus()}
                  errorText={errors?.vanueName}
                  onFocus={() => setErrors({...errors, vanueName: ''})}
                />
                <Input
                  title="Address:"
                  mode="light"
                  type="location"
                  returnKeyType="next"
                  editable={!isLoading}
                  value={data.vanueAddress}
                  setLocationObject={obj => {
                    setData({
                      ...data,
                      vanueAddress: obj?.formatted_address,
                      addressObj: obj,
                    });
                  }}
                  setValue={(t: string) => setData({...data, vanueAddress: t})}
                  ref={el => (refs.current.vanueAddress = el)}
                  onSubmitEditing={() => refs.current.firstName?.focus()}
                  errorText={errors?.addressObj || errors?.vanueAddress}
                  onFocus={() =>
                    setErrors({...errors, vanueAddress: '', addressObj: ''})
                  }
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
                <View
                  style={[
                    Layout.rowHCenter,
                    Layout.fill,
                    Layout.alignItemsStart,
                  ]}>
                  <Input
                    title="First Name:"
                    mode="light"
                    type="text"
                    returnKeyType="next"
                    editable={!isLoading}
                    value={data.firstName}
                    setValue={(t: string) => setData({...data, firstName: t})}
                    containerStyle={[Gutters.tinyRMargin]}
                    ref={el => (refs.current.firstName = el)}
                    onSubmitEditing={() => refs.current.lastName?.focus()}
                    errorText={errors?.firstName}
                    onFocus={() => setErrors({...errors, firstName: ''})}
                  />
                  <Input
                    title="Last Name:"
                    mode="light"
                    type="text"
                    returnKeyType="next"
                    editable={!isLoading}
                    value={data.lastName}
                    setValue={(t: string) => setData({...data, lastName: t})}
                    containerStyle={[Gutters.tinyLMargin]}
                    ref={el => (refs.current.lastName = el)}
                    onSubmitEditing={() => refs.current.phone?.focus()}
                    errorText={errors?.lastName}
                    onFocus={() => setErrors({...errors, lastName: ''})}
                  />
                </View>
                <Input
                  title="Mobile Number:"
                  mode="light"
                  type="text"
                  returnKeyType="next"
                  keyboardType="phone-pad"
                  editable={!isLoading}
                  value={data.phone}
                  setValue={(t: any) => {
                    if (!data.phone) {
                      setData({
                        ...data,
                        phone: t == '+' ? t : '+' + t,
                      });
                    } else {
                      setData({
                        ...data,
                        phone: t,
                      });
                    }
                  }}
                  ref={el => (refs.current.phone = el)}
                  onSubmitEditing={() => refs.current.email?.focus()}
                  errorText={errors?.phone}
                  onFocus={() => setErrors({...errors, phone: ''})}
                />
                <Input
                  title="Email:"
                  mode="light"
                  type="text"
                  returnKeyType="done"
                  keyboardType="email-address"
                  editable={!isLoading}
                  value={data.email}
                  setValue={(t: string) => setData({...data, email: t})}
                  ref={el => (refs.current.email = el)}
                  onSubmitEditing={validateData}
                  errorText={errors?.email}
                  onFocus={() => setErrors({...errors, email: ''})}
                />
                <Button
                  varient={isValid ? 'border_dark_111111' : 'disabled_light'}
                  title={isEdit ? 'UPDATE INFORMATION' : 'ADD VENUE'}
                  loading={isLoading}
                  containerStyle={[Gutters.littleVMargin]}
                  onPress={validateData}
                />
                {isEdit && (
                  <Button
                    varient={'red_FF0000'}
                    title="DELETE VENUE"
                    containerStyle={[Gutters.littleVMargin]}
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

export default AddUpdateVanueScreen;

const styles = StyleSheet.create({});
