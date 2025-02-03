import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {mS} from '@/utils/functions';

const ListSkeleton = () => {
  const {Colors, Layout} = useTheme();
  return (
    <View style={[Layout.fill, {backgroundColor: Colors.white}]}>
      <SkeletonPlaceholder
        highlightColor={Colors.gray_F2F2F2}
        backgroundColor={Colors.gray_DBDBDB}
        borderRadius={4}
        speed={2000}>
        <>
          {[1, 2, 3, 4, 5].map((val, ind) => (
            <SkeletonPlaceholder.Item
              key={ind}
              alignItems="center"
              paddingHorizontal={mS(25)}
              justifyContent="space-between"
              flexDirection="row"
              borderBottomWidth={mS(1)}
              height={mS(95)}>
              <SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item width={mS(80)} height={mS(20)} />
                <SkeletonPlaceholder.Item
                  width={mS(130)}
                  height={mS(18)}
                  marginTop={mS(5)}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item width={mS(20)} height={mS(30)} />
            </SkeletonPlaceholder.Item>
          ))}
        </>
      </SkeletonPlaceholder>
    </View>
  );
};

export default ListSkeleton;

const styles = StyleSheet.create({});
