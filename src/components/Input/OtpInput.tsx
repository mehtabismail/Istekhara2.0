import {Platform, StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import React from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {mS} from '@/utils/functions';
import {useTheme} from '@/hooks';

interface PROPS {
  editable?: boolean;
  value: string;
  setValue: (text: string) => void;
  CELL_COUNT?: number;
  rootStyle?: StyleProp<ViewStyle>;
}

const OtpInput = ({
  value,
  setValue,
  CELL_COUNT = 4,
  rootStyle,
  editable = true,
}: PROPS) => {
  const {Fonts, Colors, Gutters, Layout} = useTheme();
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      caretHidden={false}
      onChangeText={(t: string) => {
        setValue(t);
      }}
      editable={editable}
      cellCount={CELL_COUNT}
      rootStyle={[Gutters.littleVMargin, rootStyle]}
      keyboardType="numeric"
      textContentType="oneTimeCode"
      renderCell={({index, symbol, isFocused}) => {
        return (
          <Text
            key={index}
            style={[
              Fonts.OpenSans16_Regular_white,
              styles.cell,
              {
                backgroundColor:
                  isFocused || symbol ? Colors.gray_9D9D9D : Colors.white,
              },
            ]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        );
      }}
    />
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  cell: {
    width: mS(65),
    height: mS(55),
    borderRadius: mS(15),
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: Platform.OS == 'ios' ? mS(17) : 0,
  },
});
