import {mS} from '@/utils/functions';

export const spacingValues = {
  none: 0,
  '2px': mS(2),
  '3px': mS(3),
  tiny: mS(5),
  little: mS(10),
  xLittle: mS(15),
  small: mS(20),
  xSmall: mS(25),
  regular: mS(30),
  xRegular: mS(35),
  large: mS(40),
  xLarge: mS(45),
};

export type SpacingTypes = keyof typeof spacingValues;
