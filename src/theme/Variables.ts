/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import {mS} from '@/utils/functions';

/**
 * Colors
 *
 */
export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  white: '#ffffff',
  blackPrimary_111111: '#111111',
  black: '#000000',
  gray_DBDBDB: '#DBDBDB',
  gray_9D9D9D: '#9D9D9D',
  gray_707070: '#707070',
  gray_A3A3A3: '#A3A3A3',
  gray_EDEDED: '#EDEDED',
  gray_2F2F2F: '#2F2F2F',
  gray_F2F2F2: '#F2F2F2',
  gray_FAFAFA: '#FAFAFA',
  gray_FCFCFC: '#FCFCFC',
  yellowLite_FFFAEA: '#FFFAEA',
  yellowPrimary_FFF0BF: '#FFF0BF',
  red_FF0000: '#FF0000',
  green_45A300: '#45A300',
};

/**
 * Metrics Sizes
 */

const tiny = mS(5);
const little = mS(10);
const xLittle = mS(15);
const small = mS(20);
const xSmall = mS(25);
const regular = mS(30);
const xRegular = mS(35);
const large = mS(40);
const xLarge = mS(45);
const extraLarge = mS(50);

export const MetricsSizes = {
  tiny,
  little,
  xLittle,
  small,
  xSmall,
  regular,
  xRegular,
  large,
  xLarge,
  extraLarge,
};

export default {
  Colors,
  MetricsSizes,
};
