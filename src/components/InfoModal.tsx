import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';
import {mS} from '@/utils/functions';
import Button from './Button';

export type INFO_MODAL = 'success' | 'confirmation' | '';

interface MODAL {
  children: any;
}

interface SUCCESS {
  children: any;
  icon?: 'thumb' | 'delete';
  onPress: () => void;
  customButton?: any;
}

interface CONFIRMATION {
  messageText: string;
  highlightText: string;
  isLoading: boolean;
  icon?: 'check' | 'delete';
  yesPress: () => void;
  cancelPress: () => void;
}

const InfoModal = ({children}: MODAL) => {
  const {Colors, Layout, Gutters} = useTheme();
  return (
    <View
      style={[
        Layout.fill,
        Gutters.regularHPadding,
        Layout.justifyContentCenter,
        {backgroundColor: Colors.yellowPrimary_FFF0BF},
      ]}>
      {children}
    </View>
  );
};

InfoModal.Success = ({
  children,
  onPress,
  customButton,
  icon = 'thumb',
}: SUCCESS) => {
  const {Colors, Fonts, Layout, Gutters, Images} = useTheme();
  return (
    <View style={[Layout.justifyContentAround, {height: '80%'}]}>
      <Text
        style={[
          Fonts.textCenter,
          Fonts.OpenSans35_Bold_DBDBDB,
          {color: Colors.blackPrimary_111111},
        ]}>
        Success!
      </Text>
      {children}
      {icon == 'thumb' ? (
        <Images.svgIcon.sucessThumb
          height={mS(168)}
          width={mS(168)}
          style={[Layout.selfCenter]}
        />
      ) : (
        <Images.svgIcon.deleteCircleBig
          height={mS(168)}
          width={mS(168)}
          style={[Layout.selfCenter]}
        />
      )}
      {customButton ? (
        customButton
      ) : (
        <Button
          title="CONTINUE"
          onPress={onPress}
          containerStyle={[Gutters.xLittleHMargin]}
        />
      )}
    </View>
  );
};

InfoModal.Confirmation = ({
  messageText,
  highlightText,
  isLoading,
  icon = 'delete',
  yesPress,
  cancelPress,
}: CONFIRMATION) => {
  const {Colors, Fonts, Layout, Gutters, Images} = useTheme();
  return (
    <View style={[Layout.justifyContentAround, {height: '85%'}]}>
      <Text
        style={[
          Fonts.textCenter,
          Fonts.OpenSans35_Bold_DBDBDB,
          {color: Colors.blackPrimary_111111},
        ]}>
        Confirmation
      </Text>

      <Text
        style={[
          Fonts.OpenSans20_Regular_DBDBDB,
          Fonts.textCenter,
          {color: Colors.blackPrimary_111111},
        ]}>
        {messageText}{' '}
        <Text style={[Fonts.OpenSans20_Bold_111111]}>{highlightText}</Text>
      </Text>

      {icon == 'check' ? (
        <Images.svgIcon.checkFillBig
          height={mS(168)}
          width={mS(168)}
          style={[Layout.selfCenter]}
        />
      ) : (
        <Images.svgIcon.deleteCircleBig
          height={mS(168)}
          width={mS(168)}
          style={[Layout.selfCenter]}
        />
      )}

      <View>
        <Button
          title="YES"
          onPress={yesPress}
          containerStyle={[Gutters.xLittleHMargin]}
          loading={isLoading}
        />
        <Button
          title="CANCEL"
          onPress={cancelPress}
          containerStyle={[Gutters.xLittleHMargin, Gutters.smallTMargin]}
          varient="gray_9D9D9D"
          disabled={isLoading}
        />
      </View>
    </View>
  );
};
export default InfoModal;

const styles = StyleSheet.create({});
