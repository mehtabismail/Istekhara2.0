import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';
import {mS} from '@/utils/functions';

type VARIENT =
  | 'border_dark_111111'
  | 'dark_111111'
  | 'gray_DBDBDB'
  | 'gray_9D9D9D'
  | 'gray_707070'
  | 'disabled_light'
  | 'red_FF0000';

interface PROPS {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  varient?: VARIENT;
  containerStyle?: StyleProp<ViewStyle>;
}

const Button = ({
  title,
  loading,
  disabled,
  containerStyle,
  varient = 'border_dark_111111',
  onPress,
}: PROPS) => {
  const {Colors, Layout, Gutters, Fonts, Images} = useTheme();

  const getBgColor = (varient: VARIENT) => {
    switch (varient) {
      case 'border_dark_111111':
        return Colors.blackPrimary_111111;
      case 'dark_111111':
        return Colors.blackPrimary_111111;
      case 'gray_9D9D9D':
        return Colors.gray_9D9D9D;
      case 'gray_DBDBDB':
        return Colors.gray_DBDBDB;
      case 'red_FF0000':
        return Colors.red_FF0000;
      case 'disabled_light':
        return Colors.transparent;
      case 'gray_707070':
        return Colors.gray_707070;
      default:
        return Colors.blackPrimary_111111;
    }
  };

  const getBorderColor = (varient: VARIENT) => {
    switch (varient) {
      case 'border_dark_111111':
        return Colors.gray_DBDBDB;
      case 'disabled_light':
        return Colors.gray_DBDBDB;
      default:
        return Colors.transparent;
    }
  };

  const getTxtColor = (varient: VARIENT) => {
    switch (varient) {
      case 'border_dark_111111':
        return Colors.gray_DBDBDB;
      case 'dark_111111':
        return Colors.gray_DBDBDB;
      case 'gray_9D9D9D':
        return Colors.gray_DBDBDB;
      case 'gray_DBDBDB':
        return Colors.blackPrimary_111111;
      case 'red_FF0000':
        return Colors.white;
      case 'disabled_light':
        return Colors.gray_DBDBDB;
      case 'gray_707070':
        return Colors.white;
      default:
        return Colors.blackPrimary_111111;
    }
  };

  return (
    <TouchableOpacity
      disabled={loading || disabled}
      onPress={onPress}
      style={[
        Layout.center,
        Layout.row,
        {
          height: mS(50),
          backgroundColor: getBgColor(varient),
          borderRadius: mS(40),
          borderWidth: 1,
          borderColor: getBorderColor(varient),
        },
        containerStyle,
      ]}>
      {loading && (
        <ActivityIndicator
          color={getTxtColor(varient)}
          style={[Gutters.littleRMargin]}
        />
      )}
      <Text
        style={[
          Fonts.OpenSans14_Bold_DBDBDB,
          {color: getTxtColor(varient), textTransform: 'uppercase'},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
