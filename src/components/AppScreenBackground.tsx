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
import {Colors} from '@/theme/Variables';
import {mS} from '@/utils/functions';

interface PROPS {
  children: any;
}

interface HEADER {
  backPress?: () => void;
  children: string;
  subTilte?: string;
  rightItem?: any;
  userCount?: number;
}

interface BODY {
  children: any;
  containerStyle?: StyleProp<ViewStyle>;
  paddingHorizontal?: number;
  backgroundColor?: string;
}

const AppScreenBackground = ({children}: PROPS) => {
  const {Colors, Layout} = useTheme();
  return (
    <View style={[Layout.fill, {backgroundColor: Colors.blackPrimary_111111}]}>
      <View style={[Layout.fill, styles.roundedBG]}>{children}</View>
    </View>
  );
};

AppScreenBackground.Header = ({
  backPress,
  children,
  subTilte,
  rightItem,
  userCount,
}: HEADER) => {
  const {Colors, Images, Layout, Fonts, Gutters} = useTheme();
  return (
    <View
      style={[
        Layout.rowHCenter,
        Gutters.xSmallHPadding,
        {backgroundColor: Colors.yellowPrimary_FFF0BF, height: mS(88)},
      ]}>
      {backPress && (
        <TouchableOpacity onPress={backPress} style={[Gutters.xSmallRMargin]}>
          <Images.svgIcon.chevronLeft
            color={Colors.gray_707070}
            width={mS(11.6)}
            height={mS(19.8)}
          />
        </TouchableOpacity>
      )}
      <View
        style={[
          !backPress && Gutters.xLittleLMargin,
          Layout.fill,
          Gutters.littleRMargin,
        ]}>
        <Text
          numberOfLines={1}
          style={[Fonts.OpenSans25_Bold_111111, {textTransform: 'capitalize'}]}>
          {children}
        </Text>
        {subTilte && (
          <Text
            numberOfLines={1}
            style={[
              Fonts.OpenSans14_Regular_DBDBDB,
              {color: Colors.blackPrimary_111111, textTransform: 'capitalize'},
            ]}>
            {subTilte}
          </Text>
        )}
      </View>
      {userCount && (
        <View
          style={[
            Gutters.tinyVPadding,
            Gutters.littleHPadding,
            Gutters.smallRMargin,
            Gutters.tinyTMargin,
            {backgroundColor: Colors.white, borderRadius: mS(30)},
          ]}>
          <Text
            style={[Fonts.OpenSans10_Bold_DBDBDB, {color: Colors.gray_707070}]}>
            {userCount} USERS
          </Text>
        </View>
      )}
      {/* <View style={[Layout.fill]} /> */}
      {rightItem}
    </View>
  );
};

AppScreenBackground.Body = ({
  paddingHorizontal,
  backgroundColor,
  containerStyle,
  children,
}: BODY) => {
  const {Colors, Layout} = useTheme();
  return (
    <View
      style={[
        Layout.fill,
        {
          paddingHorizontal: paddingHorizontal || undefined,
          backgroundColor: backgroundColor || Colors.white,
        },
        containerStyle,
      ]}>
      {children}
    </View>
  );
};

export default AppScreenBackground;

const styles = StyleSheet.create({
  roundedBG: {
    borderTopLeftRadius: mS(35),
    borderTopRightRadius: mS(35),
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
});
