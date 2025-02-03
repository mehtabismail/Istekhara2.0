import {mS} from '@/utils/functions';
import {isNumber} from 'lodash';
import {FC, ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import React from 'react';
import {SpacingTypes, spacingValues} from './constants';
import {Colors} from '@/theme/Variables';

// Container React Native Component
type ContainerProps = {
  children: ReactNode;
  spacing?: SpacingTypes;
  vertical?: SpacingTypes;
  style?: StyleProp<ViewStyle>;
};

export const Container: FC<ContainerProps> = ({
  children,
  spacing = 'small',
  vertical,
  style,
}) => {
  const paddingHorizontal = spacingValues[spacing];
  const paddingVertical = vertical
    ? spacingValues[vertical]
    : paddingHorizontal;

  const containerStyle = {
    paddingHorizontal,
    paddingVertical,
  };
  return <View style={[containerStyle, style]}>{children}</View>;
};

type FlexJustifyType =
  | 'center'
  | 'start'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';

type FlexAlignType = 'center' | 'start' | 'end' | 'stretch' | 'baseline';
type BorderTypes = 'top' | 'Bottom' | 'left' | 'right' | 'all';

type BoxProps = {
  children?: ReactNode;
  spacing?: SpacingTypes;
  vertical?: SpacingTypes;
  top?: SpacingTypes;
  bottom?: SpacingTypes;
  justify?: FlexJustifyType;
  align?: FlexAlignType;
  flex?: number | boolean;
  grow?: boolean;
  shrink?: boolean;
  style?: StyleProp<ViewStyle>;
  border?: BorderTypes;
  borderColor?: string;
  borderWidth?: number;
};

const getFlexJustify = (justify: FlexJustifyType) => {
  switch (justify) {
    case 'center':
      return 'center';
    case 'start':
      return 'flex-start';
    case 'end':
      return 'flex-end';
    case 'between':
      return 'space-between';
    case 'around':
      return 'space-around';
    case 'evenly':
      return 'space-evenly';
  }
};

const getFlexItem = (align: FlexAlignType) => {
  switch (align) {
    case 'center':
      return 'center';
    case 'start':
      return 'flex-start';
    case 'end':
      return 'flex-end';
    case 'stretch':
      return 'stretch';
    case 'baseline':
      return 'baseline';
  }
};

const getBorder = (
  position: BorderTypes,
  width?: number,
  borderColor?: string,
) => {
  switch (position) {
    case 'top':
      return {
        borderTopColor: borderColor ? borderColor : Colors.gray_F2F2F2,
        borderTopWidth: width ? width : mS(1),
      };
    case 'Bottom':
      return {
        borderBottomColor: borderColor ? borderColor : Colors.gray_F2F2F2,
        borderBottomWidth: width ? width : mS(1),
      };
    case 'left':
      return {
        borderLeftColor: borderColor ? borderColor : Colors.gray_F2F2F2,
        borderLeftWidth: width ? width : mS(1),
      };
    case 'right':
      return {
        borderRightColor: borderColor ? borderColor : Colors.gray_F2F2F2,
        borderRightWidth: width ? width : mS(1),
      };
    case 'all':
      return {
        borderColor: borderColor ? borderColor : Colors.gray_F2F2F2,
        borderWidth: width ? width : mS(1),
      };
  }
};

export const Box: FC<BoxProps> = ({
  children,
  spacing = 'none',
  vertical,
  top,
  bottom,
  justify,
  align,
  flex,
  grow = false,
  shrink = false,
  style,
  border,
  borderColor,
  borderWidth,
}) => {
  const paddingHorizontal = spacingValues[spacing];
  const paddingVertical = vertical
    ? spacingValues[vertical]
    : paddingHorizontal;
  let boxStyle: StyleProp<ViewStyle> = {};
  if (isNumber(flex)) boxStyle.flex = flex;
  if (flex) boxStyle.flex = 1;
  if (justify) boxStyle.justifyContent = getFlexJustify(justify);
  if (align) boxStyle.alignItems = getFlexItem(align);
  if (grow) boxStyle.flexGrow = 1;
  if (shrink) boxStyle.flexShrink = 1;
  if (paddingHorizontal) boxStyle.paddingHorizontal = paddingHorizontal;
  if (paddingVertical) boxStyle.paddingVertical = paddingVertical;
  if (top) boxStyle.paddingTop = spacingValues[top];
  if (bottom) boxStyle.paddingBottom = spacingValues[bottom];
  if (border) {
    let borderStyle = getBorder(border, borderWidth, borderColor);
    boxStyle = {...boxStyle, ...borderStyle};
  }

  return <View style={[boxStyle, style]}>{children}</View>;
};

type flexWrapTypes = 'wrap-reverse' | 'nowrap' | 'wrap';

type RowProps = {
  children: ReactNode;
  column?: boolean;
  gap?: SpacingTypes;
  flex?: number | boolean;
  justify?: FlexJustifyType;
  flexWrap?: flexWrapTypes;
  align?: FlexAlignType;
  style?: StyleProp<ViewStyle>;
};

export const Row: FC<RowProps> = ({
  children,
  column = false,
  justify,
  align = 'center',
  flexWrap,
  gap = 'none',
  flex,
  style,
}) => {
  const flexDirection = column ? 'column' : 'row';
  const rowStyle: StyleProp<ViewStyle> = {
    flexDirection,
    gap: spacingValues[gap],
  };
  if (isNumber(flex)) rowStyle.flex = flex;
  if (flex) rowStyle.flex = 1;
  if (flexWrap) rowStyle.flexWrap = flexWrap;
  if (justify) rowStyle.justifyContent = getFlexJustify(justify);
  if (align) rowStyle.alignItems = getFlexItem(align);

  return <View style={[rowStyle, style]}>{children}</View>;
};
