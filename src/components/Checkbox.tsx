import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';
import {mS} from '@/utils/functions';

interface PROPS {
  status: 'checked' | 'unchecked';
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const Checkbox = ({onPress, status, containerStyle}: PROPS) => {
  const {Layout, Gutters, Fonts, Colors} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.box,
        {
          borderWidth: status == 'checked' ? mS(5) : mS(1),
          borderColor:
            status == 'checked'
              ? Colors.blackPrimary_111111
              : Colors.gray_DBDBDB,
        },
        containerStyle,
      ]}></TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  box: {
    width: mS(15),
    height: mS(15),
    borderRadius: mS(3),
  },
});
