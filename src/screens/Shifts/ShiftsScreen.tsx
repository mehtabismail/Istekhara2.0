import {RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AppScreenBackground from '@/components/AppScreenBackground';
import SearchBar from '@/components/SearchBar';
import TopTabBar from '@/components/TopTabBar';
import {useLazyGetEventsListQuery} from '@/services/modules/Events/events';
import {useAppSelector} from '@/store';
import EventsListSkeleton from '../Events/_components/EventsListSkeleton';
import {FlashList} from '@shopify/flash-list';
import {debounce} from 'lodash';
import PaginationLoader from '@/components/PaginationLoader';
import {mS} from '@/utils/functions';
import RowCard from '@/components/RowCard/RowCard';
import moment from 'moment';
import EmptyListComponent from '@/components/EmptyListComponent';
import ButtonAdd from '@/components/ButtonAdd';
import {
  useLazyGetMyShiftsListQuery,
  useLazyGetShiftRequestsQuery,
} from '@/services/modules/StaffShifts/shifts';
import RoundBoxWrapper from '@/components/RoundBox/RoundBoxWrapper';
import RoundBoxShift from '@/components/RoundBox/RoundBoxShift';
import {useTheme} from '@/hooks';

const ShiftsScreen = ({navigation, route}: any) => {
  const {Gutters, Layout, Colors, Fonts, Images} = useTheme();
  const [getMyShifts] = useLazyGetMyShiftsListQuery();
  const [getRequests] = useLazyGetShiftRequestsQuery();
  const {
    myShiftsList,
    myShiftsPagination,
    myShiftsRequestsList,
    myShiftsRequestsPagination,
  } = useAppSelector(state => state.myShifts);
  const [tab, setTab] = useState('upcoming');
  const [paginationLoader, setPaginationLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [order, setOrder] = useState(-1);
  const [sort, setSort] = useState('');

  let tabsList = [
    {label: 'Upcoming', value: 'upcoming'},
    {label: 'Previous', value: 'completed'},
    {label: 'Requests', value: 'requests'},
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    tab == 'requests'
      ? getRequests({
          params: {
            skip: 0,
            limit: 10,
            status: tab,
            order: order,
            sort: sort,
          },
        })
      : getMyShifts({
          params: {
            skip: 0,
            limit: 10,
            status: tab,
            order: order,
            sort: sort,
          },
        });
    setRefreshing(false);
  };

  const loadMoreData = () => {
    if (tab == 'requests') {
      if (
        myShiftsRequestsList?.length < myShiftsRequestsPagination.total &&
        myShiftsRequestsList?.length !== 0
      ) {
        setPaginationLoader(true);
        getRequests({
          params: {
            skip: myShiftsRequestsList?.length,
            limit: 10,
            status: tab,
            order: order,
            sort: sort,
          },
        }).then(res => {
          setPaginationLoader(false);
        });
      }
    } else {
      if (
        myShiftsList?.length < myShiftsPagination.total &&
        myShiftsList?.length !== 0
      ) {
        setPaginationLoader(true);
        getMyShifts({
          params: {
            skip: myShiftsList?.length,
            limit: 10,
            status: tab,
            order: order,
            sort: sort,
          },
        }).then(res => {
          setPaginationLoader(false);
        });
      }
    }
  };

  useEffect(() => {
    console.log('useeffect called');
    setLoading(true);
    tab == 'requests'
      ? getRequests({
          params: {
            skip: 0,
            limit: 10,
            status: tab,
            order: order,
            sort: sort,
          },
        }).then(res => {
          setLoading(false);
        })
      : getMyShifts({
          params: {
            skip: 0,
            limit: 10,
            status: tab,
            order: order,
            sort: sort,
          },
        }).then(res => {
          setLoading(false);
        });
  }, [tab]);

  const Content = item => {
    return (
      <>
        {item?.event?.venue_details?.name && (
          <Text
            numberOfLines={1}
            style={[
              Fonts.OpenSans14_Regular_DBDBDB,
              Gutters.tinyTMargin,
              {color: Colors.gray_2F2F2F},
            ]}>
            {item?.event?.venue_details?.name}
          </Text>
        )}
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
      <AppScreenBackground.Header>My Shifts</AppScreenBackground.Header>
      <AppScreenBackground.Body>
        <TopTabBar tabsList={tabsList} selected={tab} setSelected={setTab} />
        {loading ? (
          <EventsListSkeleton />
        ) : (
          <FlashList
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.2}
            keyExtractor={item => item?._id}
            data={tab == 'requests' ? myShiftsRequestsList : myShiftsList}
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
                  myShiftsList?.length < myShiftsPagination?.total &&
                  myShiftsList?.length !== 0
                    ? mS(120)
                    : mS(10)
                }
              />
            )}
            renderItem={({item}) => (
              <RoundBoxShift
                hideIcon
                title={item?.event?.name ?? ''}
                Content={() => Content(item)}
                rightBtnTitle={
                  tab == 'upcoming'
                    ? `${item?.shift?.shift_time} Shift`
                    : 'Completed'
                }
                rightBtnContent={
                  tab == 'upcoming'
                    ? `${item?.shift?.start_time} - ${item?.shift?.end_time}`
                    : null
                }
                rightBtnRadius={tab == 'requests' ? 20 : 10}
                backgroundColor={
                  tab == 'upcoming'
                    ? Colors.gray_707070
                    : tab == 'completed'
                    ? Colors.green_45A300
                    : 'red'
                }
                onPress={() =>
                  navigation.navigate('ShiftsDetailScreen', {
                    header: item?.event?.name,
                    shift_id: item?.shift?._id,
                    tab: tab,
                    setTab: setTab,
                  })
                }
              />
            )}
          />
        )}
      </AppScreenBackground.Body>
    </AppScreenBackground>
  );
};

export default ShiftsScreen;
