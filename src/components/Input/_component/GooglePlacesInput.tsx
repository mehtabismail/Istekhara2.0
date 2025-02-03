import {
  NativeSyntheticEvent,
  ReturnKeyTypeOptions,
  StyleSheet,
  Text,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import React, {forwardRef} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useTheme} from '@/hooks';
import fonts from '@/theme/assets/fonts';

interface PROPS {
  editable?: boolean;
  errorText?: string;
  value: string;
  focus: boolean;
  setValue: ((text: string) => void) | undefined;
  setLocationObject: (obj: any) => void;
  setFocus: (focus: boolean) => void;
  onSubmitEditing?: () => void;
  returnKeyType?: ReturnKeyTypeOptions | undefined;
}

const GooglePlacesInput = forwardRef(
  (
    {
      focus,
      value,
      editable,
      errorText,
      returnKeyType,
      setFocus,
      setValue,
      onSubmitEditing,
      setLocationObject,
    }: PROPS,
    ref,
  ) => {
    const {Colors, Layout, Gutters, Fonts, Images} = useTheme();
    return (
      <GooglePlacesAutocomplete
        ref={ref}
        fetchDetails={true}
        enablePoweredByContainer={false}
        debounce={400}
        onPress={(data, details: any) => {
          setLocationObject && setLocationObject(details);
          setFocus(false);
          onSubmitEditing && onSubmitEditing();
        }}
        styles={{
          separator: {
            backgroundColor: Colors.white,
            borderColor: Colors.white,
          },
          container: {},
          description: {
            fontFamily: fonts.OpenSansMedium,
            color: Colors.blackPrimary_111111,
          },
          row: {
            paddingHorizontal: 0,
          },
        }}
        textInputProps={{
          clearButtonMode: 'never',
          returnKeyType: returnKeyType,
          onSubmitEditing: onSubmitEditing,
          value: value,
          editable: editable,
          onChange: t => setValue && setValue(t.nativeEvent.text),
          onFocus: e => {
            setFocus(true);
          },
          onBlur: () => setFocus(false),
          numberOfLines: 1,
          style: [
            Fonts.OpenSans16_Regular_white,
            Layout.fill,
            Gutters.xLittleVPadding,
            {
              color: errorText
                ? Colors.red_FF0000
                : focus
                ? Colors.blackPrimary_111111
                : Colors.white,
            },
          ],
        }}
        query={{
          key: process.env.GOOGLE_API_KEY,
          language: 'en',
          components: 'country:nz',
        }}
      />
    );
  },
);

export default GooglePlacesInput;

const styles = StyleSheet.create({});

{
  /* <GooglePlacesAutocomplete
    styles={{
    container: {},
    listView: {
        backgroundColor: Colors.white,
        marginTop: 5,
    },

    description: {
        color: Colors.black,
        fontSize: mS(14),
    },
    separator: {
        backgroundColor: Colors.white,
        borderColor: Colors.white,
    },
    }}
    textInputProps={{
        clearButtonMode: 'never',
        placeholderTextColor: placeholderTextColor
            ? placeholderTextColor
            : Colors.gray1,
        value: value,
        editable: editable,
        onChange: t => setValue(t.nativeEvent.text),
        onFocus: e => {
            setFocus(true);
            onFocus && onFocus(e);
        },
        onBlur: () => setFocus(false),
        numberOfLines: 1,
        style: [
            Fonts.fontReg16,
            Gutters.xLittleHMargin,
            Layout.fill,
            {
                color: editable ? Colors.black111819 : Colors.gray1,
                marginTop: Platform.OS == 'ios' ? -5 : 0,
                lineHeight: mS(22),
                paddingVertical: Platform.OS == 'ios' ? mS(15) : mS(10),
            },
        ],
    }}
    
    
/> */
}
