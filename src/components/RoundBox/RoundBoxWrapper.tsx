import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {mS} from '@/utils/functions';
import {useTheme} from '@/hooks';

interface PROPS {
  children: any;
  hideIcon?: boolean;
  hideBorder?: boolean;
  onPress?: () => void;
  paddingHorizontal?: number;
  contentStyle?: StyleProp<ViewStyle>;
}

const RowBoxWrapper = ({
  children,
  onPress,
  hideIcon,
  hideBorder,
  contentStyle,
  paddingHorizontal,
}: PROPS) => {
  const {Gutters, Layout, Colors, Images} = useTheme();
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        Layout.rowHCenter,
        {
          paddingHorizontal: paddingHorizontal || mS(15),
          marginHorizontal: mS(10),
          marginVertical: mS(5),
          paddingVertical: hideBorder ? mS(5) : mS(20),
          backgroundColor: Colors.white,
          borderColor: Colors.gray_F2F2F2,
          borderWidth: hideBorder ? 0 : mS(1.5),
          borderRadius: mS(25),
        },
      ]}>
      {hideIcon ? (
        children
      ) : (
        <>
          <View style={[Layout.fill, Gutters.littleRPadding, contentStyle]}>
            {children}
          </View>
          <Images.svgIcon.chevronRight
            width={mS(11.6)}
            height={mS(19.8)}
            color={Colors.gray_707070}
          />
        </>
      )}
    </TouchableOpacity>
  );
};

export default RowBoxWrapper;
