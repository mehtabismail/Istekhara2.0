import {StyleSheet, Text, View} from 'react-native';
import React, {forwardRef, MutableRefObject, RefObject} from 'react';
import {Dropdown, IDropdownRef} from 'react-native-element-dropdown';
import {useTheme} from '@/hooks';
import {mS} from '@/utils/functions';

interface PROPS {
  editable?: boolean;
  errorText?: string;
  value: string;
  search?: boolean;
  data: {label: string; value: any}[];
  setValue: (text: string) => void;
  onFocus: () => void;
  onSubmitEditing?: (e?: any) => void;
}
type REF =
  | RefObject<IDropdownRef>
  | MutableRefObject<IDropdownRef>
  | null
  | undefined;

const DropdownComponent = forwardRef(
  (
    {
      data,
      setValue,
      value,
      search,
      editable,
      errorText,
      onFocus,
      onSubmitEditing,
    }: PROPS,
    ref,
  ) => {
    const {Colors, Layout, Gutters, Fonts, Images} = useTheme();
    return (
      <Dropdown
        ref={ref}
        searchPlaceholder="Search..."
        value={value}
        data={data}
        search={search}
        placeholder=""
        labelField="label"
        valueField="value"
        onFocus={onFocus}
        onChange={(item: any) => {
          setValue(item);
          onSubmitEditing && onSubmitEditing(item);
        }}
        disable={!editable}
        iconColor={Colors.gray_707070}
        activeColor={Colors.gray_DBDBDB}
        style={[Layout.fill, Gutters.xLittleVPadding, {}]}
        selectedTextStyle={[
          Fonts.OpenSans16_Regular_white,
          {
            color: errorText ? Colors.red_FF0000 : Colors.white,
          },
        ]}
        itemTextStyle={[
          Fonts.OpenSans16_Regular_white,
          {
            color: Colors.gray_707070,
          },
        ]}
        itemContainerStyle={[Gutters.littleHPadding, Gutters.tinyVPadding]}
        inputSearchStyle={[
          Fonts.OpenSans16_Regular_white,
          {
            color: Colors.gray_707070,
            margin: 0,
            padding: 0,
          },
        ]}
        // containerStyle={{bottom: -20}}
        renderRightIcon={() => (
          <Images.svgIcon.chevronDown
            color={value ? Colors.white : Colors.blackPrimary_111111}
            width={mS(12.83)}
            height={mS(7.54)}
          />
        )}
      />
    );
  },
);

export default DropdownComponent;

const styles = StyleSheet.create({});
