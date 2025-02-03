import {
  StyleProp,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';
import {mS} from '@/utils/functions';
import {Colors} from '@/theme/Variables';

interface PROPS {
  type?: 'textAdd' | 'add' | 'close';
  onPress: () => void;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

type variant = 'disabled' | 'yellow' | 'red';
interface RECT_PROPS {
  variant: variant;
  title: string;
  size?: 'small' | 'regular';
  disabled?: boolean;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ButtonAdd = () => {
  return;
};

ButtonAdd.Round = ({
  onPress,
  size,
  type = 'textAdd',
  containerStyle,
}: PROPS) => {
  const {Colors, Images, Layout, Fonts, Gutters} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        Layout.center,
        {
          height: type == 'textAdd' ? mS(61) : size ? mS(size) : mS(45),
          width: type == 'textAdd' ? mS(61) : size ? mS(size) : mS(45),
          borderRadius: mS(61 / 2),
          backgroundColor: Colors.blackPrimary_111111,
        },
        type == 'close' && {transform: [{rotate: '45deg'}]},
        containerStyle,
      ]}>
      {type == 'textAdd' ? (
        <Text style={[Fonts.OpenSans12_Bold_111111, {color: Colors.white}]}>
          ADD
        </Text>
      ) : (
        <Images.svgIcon.plusCircle
          width={size ? mS(size) : mS(45)}
          height={size ? mS(size) : mS(45)}
          color={Colors.white}
        />
      )}
    </TouchableOpacity>
  );
};

const getBGColor = (type: variant) => {
  switch (type) {
    case 'yellow':
      return Colors.yellowPrimary_FFF0BF;
    case 'red':
      return Colors.red_FF0000;
    default:
      return Colors.white;
  }
};

ButtonAdd.Rectangular = ({
  onPress,
  title,
  variant,
  disabled,
  containerStyle,
  size = 'regular',
}: RECT_PROPS) => {
  const {Colors, Images, Layout, Fonts, Gutters} = useTheme();
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        size == 'small' ? Gutters.littleHPadding : Gutters.smallHPadding,
        size == 'small' ? {paddingVertical: mS(7)} : Gutters.littleVPadding,
        Layout.selfCenter,
        {backgroundColor: getBGColor(variant), borderRadius: mS(30)},
        containerStyle,
      ]}>
      <Text
        style={[
          Fonts.OpenSans12_Bold_111111,
          {color: variant == 'red' ? Colors.white : Colors.blackPrimary_111111},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonAdd;
