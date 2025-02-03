import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import RoundBoxWrapper from './RoundBoxWrapper';
import RoundBoxRightBtn from './RoundBoxRightBtn';
import {useTheme} from '@/hooks';
import RoundBoxTitle from './RoundBoxTitle';

const RoundBoxShift = ({
  hideIcon,
  hideBorder,
  title,
  Content,
  rightBtnTitle,
  rightBtnContent,
  onRightBtnPress,
  rightBtnRadius,
  backgroundColor,
  onPress,
}: any) => {
  const {Gutters, Layout, Colors, Images} = useTheme();
  return (
    <RoundBoxWrapper
      hideIcon={hideIcon}
      hideBorder={hideBorder}
      onPress={onPress}>
      <View
        style={[
          Layout.fill,
          Layout.row,
          Layout.center,
          Layout.justifyContentBetween,
        ]}>
        <View style={[{width: rightBtnTitle ? '60%' : '100%'}]}>
          {!!title && <RoundBoxTitle>{title}</RoundBoxTitle>}
          <Content />
        </View>
        {rightBtnTitle && (
          <View style={{width: '35%'}}>
            <RoundBoxRightBtn
              rightBtnTitle={rightBtnTitle}
              rightBtnContent={rightBtnContent}
              onRightBtnPress={onRightBtnPress}
              rightBtnRadius={rightBtnRadius}
              backgroundColor={backgroundColor}
            />
          </View>
        )}
      </View>
    </RoundBoxWrapper>
  );
};

export default RoundBoxShift;
