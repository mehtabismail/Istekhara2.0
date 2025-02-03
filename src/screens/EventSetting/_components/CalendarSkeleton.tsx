import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {mS} from '@/utils/functions';

const CalendarSkeleton = () => {
  const {Colors, Layout} = useTheme();
  return (
    <SkeletonPlaceholder
      highlightColor={Colors.gray_F2F2F2}
      backgroundColor={Colors.gray_DBDBDB}
      borderRadius={4}
      speed={2000}>
      <>
        <SkeletonPlaceholder.Item
          paddingHorizontal={mS(20)}
          paddingVertical={mS(20)}
          borderBottomWidth={mS(1)}>
          <SkeletonPlaceholder.Item
            borderRadius={mS(20)}
            alignItems="center"
            borderWidth={mS(1)}
            width={'100%'}
            paddingHorizontal={mS(20)}
            height={mS(365)}>
            <SkeletonPlaceholder.Item
              width={'50%'}
              height={mS(30)}
              borderRadius={mS(5)}
              marginTop={20}
            />
            {[1, 2, 3, 4, 5, 6].map((item, ind) => {
              return (
                <SkeletonPlaceholder.Item
                  key={ind}
                  width={'100%'}
                  height={mS(25)}
                  borderRadius={mS(5)}
                  marginTop={mS(23)}
                />
              );
            })}
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </>
    </SkeletonPlaceholder>
  );
};

export default CalendarSkeleton;

const styles = StyleSheet.create({});
