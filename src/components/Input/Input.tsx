import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  ReturnKeyTypeOptions,
  StyleProp,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {forwardRef, LegacyRef, useState} from 'react';
import {useTheme} from '@/hooks';
import {mS} from '@/utils/functions';
import TextInputComponent from './_component/TextInputComponent';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import GooglePlacesInput from './_component/GooglePlacesInput';
import DateTimeInput from './_component/DateTimeInput';
import DropdownComponent from './_component/DropdownComponent';

interface PROPS {
  type?: 'text' | 'password' | 'location' | 'dateTime' | 'dropdown';
  dateType?: 'date' | 'time' | 'datetime' | undefined;
  mode?: 'dark' | 'light';
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
  value: string;
  title?: string;
  selectedDate?: string;
  placeholder?: string;
  editable?: boolean;
  multiline?: boolean;
  dropdownSearch?: boolean;
  errorText?: string;
  numberOfLines?: number;
  maxLength?: number;
  disableDatePicker?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  keyboardType?: KeyboardTypeOptions | undefined;
  dropdownData?: {label: string; value: any}[];
  onFocus?: () => void;
  setValue: ((text: string) => void) | undefined;
  setLocationObject?: (obj: any) => void;
  disablePress: boolean;
  onInputPress?: () => void;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  returnKeyType?: ReturnKeyTypeOptions | undefined;
}

const Input = forwardRef(
  (
    {
      value,
      selectedDate,
      title,
      dateType,
      errorText,
      multiline,
      maxLength,
      placeholder,
      keyboardType,
      containerStyle,
      returnKeyType,
      numberOfLines,
      dropdownData,
      disablePress,
      dropdownSearch,
      pointerEvents = 'auto',
      disableDatePicker,
      onFocus,
      setValue,
      setLocationObject,
      onSubmitEditing,
      onInputPress,
      editable = true,
      type = 'text',
      mode = 'dark',
    }: PROPS,
    ref: LegacyRef<TextInput> | undefined,
  ) => {
    const {Colors, Layout, Gutters, Fonts, Images} = useTheme();
    const [focus, setFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    return (
      <View style={[Gutters.littleVMargin, Layout.fill, containerStyle]}>
        {title && (
          <Text
            style={[
              Fonts.OpenSans14_Regular_DBDBDB,
              mode == 'light' && {color: Colors.blackPrimary_111111},
            ]}>
            {title}
          </Text>
        )}
        <TouchableOpacity
          disabled={disablePress}
          onPress={onInputPress}
          style={[
            // type == 'text' || type == 'password'
            //   ? undefined
            //   : Gutters.xLittleVPadding,
            Gutters.xLittleHPadding,
            Gutters.tinyTMargin,
            Layout.rowHCenter,
            {
              backgroundColor:
                !focus && value
                  ? Colors.gray_9D9D9D
                  : selectedDate
                  ? Colors.gray_9D9D9D
                  : Colors.white,
              borderRadius: mS(15),
              borderWidth: mS(1),
              borderColor: errorText
                ? Colors.red_FF0000
                : mode == 'light'
                ? Colors.gray_DBDBDB
                : Colors.transparent,
            },
          ]}>
          {type == 'text' || type == 'password' ? (
            <View pointerEvents={pointerEvents} style={[Layout.fill]}>
              <TextInputComponent
                ref={ref}
                setFocus={res => {
                  setFocus(res);
                  if (res) {
                    onFocus && onFocus();
                  }
                }}
                maxLength={maxLength}
                placeholder={placeholder}
                focus={focus}
                errorText={errorText}
                editable={editable}
                value={value}
                multiline={multiline}
                setValue={setValue}
                numberOfLines={numberOfLines}
                keyboardType={keyboardType}
                onSubmitEditing={onSubmitEditing}
                returnKeyType={returnKeyType}
                secureTextEntry={
                  type == 'password' && !showPassword ? true : false
                }
              />
            </View>
          ) : type == 'location' ? (
            <GooglePlacesInput
              ref={ref}
              focus={focus}
              errorText={errorText}
              editable={editable}
              value={value}
              setValue={setValue}
              setLocationObject={obj =>
                setLocationObject && setLocationObject(obj)
              }
              setFocus={res => {
                setFocus(res);
                if (res) {
                  onFocus && onFocus();
                }
              }}
              onSubmitEditing={onSubmitEditing}
              returnKeyType={returnKeyType}
            />
          ) : type == 'dateTime' ? (
            <DateTimeInput
              errorText={errorText}
              selectedDate={selectedDate}
              editable={editable}
              value={value}
              setValue={setValue}
              dateType={dateType}
              disableDatePicker={disableDatePicker}
              onSubmitEditing={onSubmitEditing}
            />
          ) : type == 'dropdown' ? (
            <DropdownComponent
              ref={ref}
              errorText={errorText}
              editable={editable}
              value={value}
              search={dropdownSearch}
              setValue={setValue}
              onFocus={onFocus}
              onSubmitEditing={onSubmitEditing}
              data={dropdownData}
            />
          ) : null}

          {type == 'password' ? (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Images.svgIcon.eyeClose
                  height={mS(20)}
                  width={mS(31)}
                  color={
                    focus || value
                      ? Colors.blackPrimary_111111
                      : Colors.gray_DBDBDB
                  }
                />
              ) : (
                <Images.svgIcon.eyeOpen
                  height={mS(20)}
                  width={mS(31)}
                  color={
                    focus || value
                      ? Colors.blackPrimary_111111
                      : Colors.gray_DBDBDB
                  }
                />
              )}
            </TouchableOpacity>
          ) : type == 'dateTime' ? (
            <Images.svgIcon.calendarOutline
              height={mS(20)}
              width={mS(20)}
              color={selectedDate ? Colors.white : Colors.blackPrimary_111111}
            />
          ) : null}
        </TouchableOpacity>
        {errorText && (
          <Text
            style={[
              Fonts.OpenSans14_Regular_DBDBDB,
              {color: Colors.red_FF0000, marginTop: mS(6)},
            ]}>
            {errorText}
          </Text>
        )}
      </View>
    );
  },
);

export default Input;
