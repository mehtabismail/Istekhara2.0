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
import {Colors} from '@/theme/Variables';

interface PROPS {
  backPress?: () => void;
  title: string;
  subTilte?: string;
  rightItem?: any;
  userCount?: number;
}

interface SECTION {
  title: string;
  Icon: any;
  iconWidth: number;
  iconHeight: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const Header = () => {
  return;
};

Header.Section = ({
  title,
  Icon,
  iconHeight,
  iconWidth,
  containerStyle,
}: SECTION) => {
  const {Colors, Layout, Fonts, Gutters} = useTheme();
  return (
    <View
      style={[
        Layout.rowHCenter,
        Gutters.xLittleVPadding,
        styles.sectionContainer,
        containerStyle,
      ]}>
      <Icon
        width={iconWidth}
        height={iconHeight}
        color={Colors.blackPrimary_111111}
      />
      <Text
        numberOfLines={1}
        style={[
          Fonts.OpenSans20_Bold_111111,
          Gutters.littleLMargin,
          Layout.fill,
          {color: Colors.gray_707070},
        ]}>
        {title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  sectionContainer: {
    borderBottomWidth: mS(1),
    borderBottomColor: Colors.gray_DBDBDB,
  },
});
