/**
 * This file contains all application's style relative to fonts
 */
import {StyleSheet} from 'react-native';
import {ThemeVariables} from '../../@types/theme';
import fonts from './assets/fonts';
import {mS} from '@/utils/functions';

export default function ({Colors}: ThemeVariables) {
  return StyleSheet.create({
    OpenSans10_Bold_DBDBDB: {
      fontFamily: fonts.OpenSansBold,
      fontSize: mS(10),
      lineHeight: mS(14),
      color: Colors.gray_DBDBDB,
    },
    OpenSans11_Regular_707070: {
      fontFamily: fonts.OpenSansRegular,
      fontSize: mS(11),
      lineHeight: mS(15),
      color: Colors.gray_707070,
    },
    OpenSans12_Regular_111111: {
      fontFamily: fonts.OpenSansRegular,
      fontSize: mS(12),
      lineHeight: mS(17),
      color: Colors.blackPrimary_111111,
    },
    OpenSans12_Bold_111111: {
      fontFamily: fonts.OpenSansBold,
      fontSize: mS(12),
      lineHeight: mS(16),
      color: Colors.blackPrimary_111111,
    },
    OpenSans14_Regular_DBDBDB: {
      fontFamily: fonts.OpenSansRegular,
      fontSize: mS(14),
      lineHeight: mS(19),
      color: Colors.gray_DBDBDB,
    },
    OpenSans14_SemiBold: {
      fontFamily: fonts.OpenSansSemiBold,
      fontSize: mS(14),
      lineHeight: mS(19),
      color: Colors.blackPrimary_111111,
    },
    OpenSans14_Bold_DBDBDB: {
      fontFamily: fonts.OpenSansBold,
      fontSize: mS(14),
      lineHeight: mS(19),
      color: Colors.gray_DBDBDB,
    },
    OpenSans15_Bold_111111: {
      fontFamily: fonts.OpenSansBold,
      fontSize: mS(15),
      lineHeight: mS(20),
      color: Colors.blackPrimary_111111,
    },
    OpenSans16_Regular_white: {
      fontFamily: fonts.OpenSansRegular,
      fontSize: mS(16),
      lineHeight: mS(22),
      color: Colors.white,
    },
    OpenSans16_SemiBold_111111: {
      fontFamily: fonts.OpenSansSemiBold,
      fontSize: mS(16),
      lineHeight: mS(22),
      color: Colors.blackPrimary_111111,
    },
    OpenSans18_Bold_111111: {
      fontFamily: fonts.OpenSansBold,
      fontSize: mS(18),
      lineHeight: mS(24),
      color: Colors.blackPrimary_111111,
    },

    OpenSans20_Regular_DBDBDB: {
      fontFamily: fonts.OpenSansRegular,
      fontSize: mS(20),
      lineHeight: mS(27),
      color: Colors.gray_DBDBDB,
    },
    OpenSans20_Bold_111111: {
      fontFamily: fonts.OpenSansBold,
      fontSize: mS(20),
      lineHeight: mS(27),
      color: Colors.blackPrimary_111111,
    },
    OpenSans25_Bold_white: {
      fontFamily: fonts.OpenSansBold,
      fontSize: mS(25),
      lineHeight: mS(34),
      color: Colors.white,
    },
    OpenSans25_Bold_111111: {
      fontFamily: fonts.OpenSansBold,
      fontSize: mS(25),
      lineHeight: mS(34),
      color: Colors.blackPrimary_111111,
    },
    OpenSans30_Bold_111111: {
      fontFamily: fonts.OpenSansBold,
      fontSize: mS(30),
      lineHeight: mS(40),
      color: Colors.blackPrimary_111111,
    },
    OpenSans35_Bold_DBDBDB: {
      fontFamily: fonts.OpenSansBold,
      fontSize: mS(35),
      lineHeight: mS(47),
      color: Colors.gray_DBDBDB,
    },
    textUppercase: {
      textTransform: 'uppercase',
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
    white: {
      color: Colors.white,
    },
    black_111111: {
      color: Colors.blackPrimary_111111,
    },
    gray707070: {
      color: Colors.gray_707070,
    },
    gray9D9D9D: {
      color: Colors.gray_9D9D9D,
    },
    grayDBDBDB: {
      color: Colors.gray_DBDBDB,
    },
    redFF0000: {
      color: Colors.red_FF0000,
    },
  });
}
