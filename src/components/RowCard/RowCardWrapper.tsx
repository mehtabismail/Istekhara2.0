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
  onPress: () => void;
  paddingHorizontal?: number;
  contentStyle?: StyleProp<ViewStyle>;
}

const RowCardWrapper = ({
  children,
  onPress,
  hideIcon,
  contentStyle,
  paddingHorizontal,
}: PROPS) => {
  const {Gutters, Layout, Colors, Images} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        Layout.rowHCenter,
        {
          paddingHorizontal: paddingHorizontal || mS(25),
          height: mS(95),
          backgroundColor: Colors.white,
          borderBottomColor: Colors.gray_F2F2F2,
          borderBottomWidth: mS(1.5),
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

export default RowCardWrapper;
