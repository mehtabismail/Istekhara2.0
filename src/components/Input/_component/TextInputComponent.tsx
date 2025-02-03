import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  Platform,
  ReturnKeyTypeOptions,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
} from 'react-native';
import React, {forwardRef, LegacyRef} from 'react';
import {useTheme} from '@/hooks';
import {mS} from '@/utils/functions';

interface PROPS {
  editable?: boolean;
  secureTextEntry: boolean;
  errorText?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  value: string;
  focus: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  setValue: ((text: string) => void) | undefined;
  setFocus: (focus: boolean) => void;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  returnKeyType?: ReturnKeyTypeOptions | undefined;
}
const TextInputComponent = forwardRef(
  (
    {
      value,
      focus,
      editable,
      errorText,
      multiline,
      maxLength,
      placeholder,
      keyboardType,
      returnKeyType,
      numberOfLines,
      secureTextEntry,
      setValue,
      setFocus,
      onSubmitEditing,
    }: PROPS,
    ref: LegacyRef<TextInput> | undefined,
  ) => {
    const {Colors, Layout, Gutters, Fonts} = useTheme();
    return (
      <TextInput
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        maxLength={maxLength}
        ref={ref}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={value}
        editable={editable}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray_9D9D9D}
        keyboardType={keyboardType}
        numberOfLines={numberOfLines}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        style={[
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
          !multiline && {height: mS(52)},
          multiline &&
            numberOfLines > 1 && {
              minHeight: mS(22) * numberOfLines,
              textAlignVertical: 'top',
            },
        ]}
      />
    );
  },
);

export default TextInputComponent;

const styles = StyleSheet.create({});
