import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';
import {mS} from '@/utils/functions';

const ContactDetail = ({email, phone, size}: any) => {
  const {Gutters, Layout, Colors, Fonts, Images} = useTheme();
  return (
    <View style={[Layout.row, Gutters.littleTMargin]}>
      {email && (
        <View style={[Layout.row, Layout.center]}>
          <Images.svgIcon.email
            width={size ? mS(size) : mS(18.31)}
            height={size ? mS(size) : mS(14.17)}
            color={Colors.green_45A300}
          />
          <Text
            numberOfLines={1}
            style={[
              Fonts.OpenSans12_Regular_111111,
              Gutters.tinyLMargin,
              {color: Colors.gray_2F2F2F},
            ]}>
            {email ?? ''}
          </Text>
        </View>
      )}
      {phone && (
        <View style={[Layout.row, Layout.center, Gutters.smallLMargin]}>
          <Images.svgIcon.phoneCall
            width={size ? mS(size) : mS(18.31)}
            height={size ? mS(size) : mS(14.17)}
            color={Colors.green_45A300}
          />
          <Text
            numberOfLines={1}
            style={[
              Fonts.OpenSans12_Regular_111111,
              {color: Colors.gray_2F2F2F},
            ]}>
            {phone ?? ''}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ContactDetail;
