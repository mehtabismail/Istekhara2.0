import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import RowCardWrapper from './RowCardWrapper';
import {useTheme} from '@/hooks';
import RowCardTitle from './RowCardTitle';
import RowCardSubtitle from './RowCardSubtitle';
import ShiftDetailChip from '../ShiftDetailChip';
import {mS} from '@/utils/functions';
import {Colors} from '@/theme/Variables';
import FillStatusChip from '../FillStatusChip';
import Avatar from '../Avatar';
import {Box, Row} from '../UI/Layout';
import {Swipeable} from 'react-native-gesture-handler';

interface PROPS {
  onPress: () => void;
  title: string;
  subTitle?: string;
  customSubComponent?: any;
}

interface TITLE {
  title: string;
  onPress: () => void;
}

interface SUB_TITLE {
  title: string;
  subTitle: string;
  onPress: () => void;
}

interface EVENT {
  title: string;
  subTitle: string;
  venue: string;
  date: string;
  onPress: () => void;
}

interface SHIFT_DETAIL {
  title: string;
  time: string;
  date: string;
  onPress: () => void;
  status: 'filled' | 'unfilled';
}

interface SHIFT {
  title: string;
  date: string;
  status?: 'filled' | 'unfilled';
  onPress: () => void;
  shiftLabel: string;
  shiftTime: string;
  startTime: string;
  endTime: string;
}

interface MEMBERS {
  onPress: () => void;
  title: string;
  inTime: string;
  outTime: string;
  img?: string;
  isOnline?: boolean;
  isCheif?: boolean;
}

interface TASK {
  status: 'open' | 'completed';
  title: string;
  completionDate?: string;
  whoComplete?: string;
  onPress: () => void;
  delPress?: () => void;
  editPress?: () => void;
}

const RowCard = () => {
  return;
};

RowCard.Title = ({title, onPress}: TITLE) => {
  return (
    <RowCardWrapper onPress={onPress}>
      <RowCardTitle size="18">{title}</RowCardTitle>
    </RowCardWrapper>
  );
};

RowCard.TitleSubTitle = ({onPress, title, subTitle}: SUB_TITLE) => {
  return (
    <RowCardWrapper onPress={onPress}>
      <RowCardTitle>{title}</RowCardTitle>
      <RowCardSubtitle>{subTitle}</RowCardSubtitle>
    </RowCardWrapper>
  );
};

RowCard.Event = ({onPress, title, subTitle, date, venue}: EVENT) => {
  const {Gutters, Layout, Fonts} = useTheme();
  return (
    <RowCardWrapper contentStyle={[Layout.row]} onPress={onPress}>
      <View style={[Layout.fill, Gutters.littleRPadding]}>
        <RowCardTitle>{title}</RowCardTitle>
        <RowCardSubtitle>{subTitle}</RowCardSubtitle>
      </View>
      <View style={[Layout.fill]}>
        <Text numberOfLines={1} style={[Fonts.OpenSans12_Bold_111111]}>
          {venue}
        </Text>
        <Text
          numberOfLines={2}
          style={[
            Fonts.OpenSans12_Regular_111111,
            {color: Colors.gray_707070},
          ]}>
          {date}
        </Text>
      </View>
    </RowCardWrapper>
  );
};

RowCard.ShiftDetail = ({onPress, title, status, date, time}: SHIFT_DETAIL) => {
  const {Gutters, Layout, Fonts} = useTheme();
  return (
    <RowCardWrapper contentStyle={[Layout.row]} onPress={onPress}>
      <View style={[Layout.fill, Gutters.littleRPadding]}>
        <RowCardTitle>{title}</RowCardTitle>
        <FillStatusChip
          status={status}
          containerStyle={[Gutters.tinyTMargin]}
        />
      </View>
      <View style={[Layout.fill]}>
        <Text numberOfLines={2} style={[Fonts.OpenSans12_Regular_111111]}>
          {date}
        </Text>
        <Text
          numberOfLines={1}
          style={[Fonts.OpenSans14_Bold_DBDBDB, Fonts.gray707070]}>
          {time}
        </Text>
      </View>
    </RowCardWrapper>
  );
};

RowCard.Shift = ({
  onPress,
  title,
  status,
  shiftLabel,
  date,
  endTime,
  shiftTime,
  startTime,
}: SHIFT) => {
  const {Gutters, Layout, Fonts} = useTheme();
  return (
    <RowCardWrapper onPress={onPress}>
      <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
        <RowCardTitle>{title}</RowCardTitle>
        {status && (
          <View
            style={[
              styles.status,
              Gutters.littleRMargin,
              Layout.center,
              {
                backgroundColor:
                  status == 'filled'
                    ? Colors.blackPrimary_111111
                    : Colors.gray_9D9D9D,
              },
            ]}>
            <Text style={[Fonts.OpenSans10_Bold_DBDBDB, {color: Colors.white}]}>
              {status == 'filled' ? 'Filled' : 'Unfilled'}
            </Text>
          </View>
        )}
      </View>
      <View
        style={[
          Layout.rowHCenter,
          Gutters.littleTMargin,
          // Layout.justifyContentBetween,
        ]}>
        <ShiftDetailChip
          label={shiftLabel}
          endTime={endTime}
          shiftTime={shiftTime}
          startTime={startTime}
        />
        <Text
          numberOfLines={1}
          style={[
            Fonts.OpenSans11_Regular_707070,
            Fonts.textRight,
            // Layout.fill,
            Gutters.tinyLMargin,
            Gutters.littleRMargin,
            {flex: 2.5},
          ]}>
          {date}
        </Text>
      </View>
    </RowCardWrapper>
  );
};

RowCard.Members = ({
  onPress,
  inTime,
  outTime,
  title,
  img,
  isCheif,
  isOnline,
}: MEMBERS) => {
  const {Gutters, Layout, Fonts, Images} = useTheme();
  return (
    <RowCardWrapper paddingHorizontal={mS(20)} onPress={onPress}>
      <Row>
        <Avatar
          alt={title}
          showOnlineStatus
          isOnline={isOnline}
          size={61}
          src={img}
        />
        {isCheif && (
          <View style={[styles.crownIcon]}>
            <Images.svgIcon.crownFill height={mS(9)} width={mS(16.33)} />
          </View>
        )}
        <Text
          numberOfLines={1}
          style={[
            Fonts.OpenSans15_Bold_111111,
            Gutters.littleHMargin,
            {flex: 2},
          ]}>
          {title}
        </Text>
        <Box style={[Layout.fill]}>
          <Text numberOfLines={1} style={[Fonts.OpenSans12_Bold_111111]}>
            In
          </Text>
          <Text
            numberOfLines={1}
            style={[Fonts.OpenSans12_Regular_111111, Fonts.gray707070]}>
            {inTime || 'N/A'}
          </Text>
        </Box>
        <Box style={[Layout.fill]}>
          <Text numberOfLines={1} style={[Fonts.OpenSans12_Bold_111111]}>
            Out
          </Text>
          <Text
            numberOfLines={1}
            style={[Fonts.OpenSans12_Regular_111111, Fonts.gray707070]}>
            {outTime || 'N/A'}
          </Text>
        </Box>
      </Row>
    </RowCardWrapper>
  );
};

RowCard.Task = ({
  onPress,
  status,
  editPress,
  delPress,
  title,
  completionDate,
  whoComplete,
}: TASK) => {
  const {Gutters, Layout, Fonts, Images, Colors} = useTheme();
  const swipeableRef = useRef(null);

  const Right = ({
    onePress,
    twoPress,
  }: {
    onePress: () => void;
    twoPress: () => void;
  }) => {
    return (
      <View style={[Layout.row]}>
        {status == 'open' && (
          <TouchableOpacity
            onPress={() => {
              onePress();
              swipeableRef.current.close();
            }}
            style={[
              Layout.center,
              {
                width: mS(95),
                height: mS(95),
                backgroundColor: Colors.gray_DBDBDB,
              },
            ]}>
            <Text style={[Fonts.OpenSans14_SemiBold, Gutters.littleBMargin]}>
              Edit
            </Text>
            <Images.svgIcon.edit
              width={mS(18)}
              height={mS(18)}
              color={Colors.blackPrimary_111111}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            twoPress();
            swipeableRef.current.close();
          }}
          style={[
            Layout.center,
            {
              width: mS(95),
              height: mS(95),
              backgroundColor: '#f34235',
            },
          ]}>
          <Text
            style={[
              Fonts.OpenSans14_SemiBold,
              Fonts.white,
              {marginBottom: mS(7)},
            ]}>
            Delete
          </Text>
          <Images.svgIcon.deleteCircle width={mS(25)} height={mS(25)} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Swipeable
      ref={swipeableRef}
      cancelsTouchesInView
      shouldCancelWhenOutside={true}
      renderRightActions={() => (
        <Right onePress={editPress} twoPress={delPress} />
      )}>
      <RowCardWrapper
        hideIcon={status == 'completed' ? true : false}
        paddingHorizontal={mS(20)}
        onPress={onPress}>
        <Row>
          <View style={[Layout.fill]}>
            <Text numberOfLines={1} style={[Fonts.OpenSans15_Bold_111111]}>
              {title}
            </Text>
            <View
              style={[
                styles.statusChip,
                {
                  backgroundColor:
                    status == 'completed'
                      ? Colors.green_45A300
                      : Colors.yellowPrimary_FFF0BF,
                },
              ]}>
              <Text
                style={[
                  Fonts.OpenSans10_Bold_DBDBDB,
                  status == 'completed' ? Fonts.white : Fonts.black_111111,
                  {marginVertical: mS(2)},
                ]}>
                {status == 'completed' ? 'Completed' : 'Open'}
              </Text>
            </View>
          </View>
          {status == 'completed' && (
            <View style={[Layout.alignItemsEnd, Layout.fill]}>
              <Text
                numberOfLines={1}
                style={[Fonts.OpenSans12_Regular_111111, Fonts.textRight]}>
                {completionDate}
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  Fonts.OpenSans14_Bold_DBDBDB,
                  Fonts.gray707070,
                  Fonts.textRight,
                ]}>
                {whoComplete}
              </Text>
            </View>
          )}
        </Row>
      </RowCardWrapper>
    </Swipeable>
  );
};
export default RowCard;

const styles = StyleSheet.create({
  status: {
    height: mS(17),
    width: mS(70),
    backgroundColor: Colors.blackPrimary_111111,
    borderRadius: mS(17),
  },
  crownIcon: {position: 'absolute', left: mS(71), top: mS(12), zIndex: 1},
  statusChip: {
    alignSelf: 'flex-start',
    borderRadius: mS(10),
    width: mS(90),
    alignItems: 'center',
  },
});
