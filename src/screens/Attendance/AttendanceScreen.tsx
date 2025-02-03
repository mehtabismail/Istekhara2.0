import {RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppScreenBackground from '@/components/AppScreenBackground';
import {useAppSelector} from '@/store';
import {useLazyGetAttendenceListQuery} from '@/services/modules/Attendence/attendence';
import EventsListSkeleton from '../Events/_components/EventsListSkeleton';
import {FlashList} from '@shopify/flash-list';
import EmptyListComponent from '@/components/EmptyListComponent';
import PaginationLoader from '@/components/PaginationLoader';
import {mS} from '@/utils/functions';
import {useTheme} from '@/hooks';
import RoundBoxShift from '@/components/RoundBox/RoundBoxShift';
import moment from 'moment';
import AttendenceBox from './AttendenceBox';

const AttendanceScreen = ({navigation}: any) => {
  const {Gutters, Layout, Colors, Fonts, Images} = useTheme();
  const [paginationLoader, setPaginationLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [order, setOrder] = useState(-1);
  const [sort, setSort] = useState('');

  const [getAttendenceList] = useLazyGetAttendenceListQuery();

  const {user} = useAppSelector(state => state.auth);
  const {attendenceList, attendencePagination} = useAppSelector(
    state => state.attendence,
  );

  const onRefresh = async () => {
    setRefreshing(true);
    getAttendenceList({
      params: {
        skip: 0,
        limit: 10,
        user: user?._id,
        order: order,
        sort: sort,
      },
    });
    setRefreshing(false);
  };

  const loadMoreData = () => {
    if (
      attendenceList?.length < attendencePagination.total &&
      attendenceList?.length !== 0
    ) {
      setPaginationLoader(true);
      getAttendenceList({
        params: {
          skip: attendenceList?.length,
          limit: 10,
          order: order,
          sort: sort,
        },
      }).then(res => {
        setPaginationLoader(false);
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    getAttendenceList({
      params: {
        skip: 0,
        limit: 10,

        order: order,
        sort: sort,
      },
    }).then(res => {
      setLoading(false);
    });
  }, []);

  const Content = item => {
    console.log(item);
    return (
      <>
        <Text
          numberOfLines={1}
          style={[
            Fonts.OpenSans14_Regular_DBDBDB,
            Gutters.tinyTMargin,
            Gutters.littleBMargin,
            {color: Colors.gray_2F2F2F},
          ]}>
          {item?.event_id?.venue?.name ?? ''}
        </Text>

        <Text
          numberOfLines={1}
          style={[
            Fonts.OpenSans14_Regular_DBDBDB,
            Gutters.tinyTMargin,
            {color: Colors.gray_2F2F2F},
          ]}>
          {moment(item?.shift?.date).format('DD MMMM YYYY') ?? ''}
        </Text>
      </>
    );
  };

  return (
    <AppScreenBackground>
      <AppScreenBackground.Header>Attendence</AppScreenBackground.Header>
      <AppScreenBackground.Body>
        <Text
          numberOfLines={1}
          style={[
            Fonts.OpenSans12_Regular_111111,
            Gutters.smallHMargin,
            Gutters.xLittleVMargin,
            {color: Colors.gray_9D9D9D},
          ]}>
          View your attendence history here
        </Text>

        {loading ? (
          <EventsListSkeleton />
        ) : (
          <FlashList
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.2}
            keyExtractor={item => item?._id}
            data={attendenceList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={EmptyListComponent}
            estimatedItemSize={200}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListFooterComponent={() => (
              <PaginationLoader
                loading={paginationLoader}
                height={
                  attendenceList?.length < attendencePagination?.total &&
                  attendenceList?.length !== 0
                    ? mS(120)
                    : mS(10)
                }
              />
            )}
            renderItem={({item}) => (
              <AttendenceBox
                hideIcon
                title={item?.event_id?.name ?? ''}
                Content={() => Content(item)}
              />
            )}
          />
        )}
      </AppScreenBackground.Body>
    </AppScreenBackground>
  );
};

export default AttendanceScreen;

const styles = StyleSheet.create({});
