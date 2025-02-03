import {RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AppScreenBackground from '@/components/AppScreenBackground';
import ButtonAdd from '@/components/ButtonAdd';
import SearchBar from '@/components/SearchBar';
import TopTabBar from '@/components/TopTabBar';
import RowCard from '@/components/RowCard/RowCard';
import {
  useLazyGetEventsListQuery,
  useLazyGetSelectedEventQuery,
} from '@/services/modules/Events/events';
import {useAppSelector} from '@/store';
import {debounce} from 'lodash';
import {FlashList} from '@shopify/flash-list';
import EmptyListComponent from '@/components/EmptyListComponent';
import PaginationLoader from '@/components/PaginationLoader';
import EventsListSkeleton from './_components/EventsListSkeleton';
import moment from 'moment';
import {mS} from '@/utils/functions';

let tabsList = [
  {label: 'Upcoming', value: 'pending'},
  {label: 'In-Progress', value: 'active'},
  {label: 'Completed', value: 'completed'},
];

const EventsMainScreen = ({navigation}: any) => {
  const [getEvents] = useLazyGetEventsListQuery();
  const {eventsList, eventsPagination} = useAppSelector(state => state.events);
  const [tab, setTab] = useState('pending');
  const [paginationLoader, setPaginationLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [order, setOrder] = useState(-1);
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');

  const debouncedFetchResults = useCallback(
    debounce(text => {
      setLoading(true);
      getEvents({
        params: {
          skip: 0,
          limit: 10,
          status: tab,
          search: text,
          order: order,
          sort: sort,
        },
      }).then(res => {
        setLoading(false);
      });
    }, 500),
    [tab, order, sort],
  );

  const handleFilter = async () => {
    setLoading(true);
    await getEvents({
      params: {
        skip: 0,
        limit: 10,
        status: tab,
        search: search,
        sort: 'name',
        order: order == -1 ? 1 : -1,
      },
    });
    setSort('name');
    setOrder(order == -1 ? 1 : -1);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getEvents({
      params: {
        skip: 0,
        limit: 10,
        status: tab,
        search: search,
        order: order,
        sort: sort,
      },
    });
    setRefreshing(false);
  };

  const loadMoreData = () => {
    if (
      eventsList?.length < eventsPagination.total &&
      eventsList?.length !== 0
    ) {
      setPaginationLoader(true);
      getEvents({
        params: {
          skip: eventsList?.length,
          limit: 10,
          status: tab,
          search: search,
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
    getEvents({
      params: {
        skip: 0,
        limit: 10,
        status: tab,
        search: search,
        order: order,
        sort: sort,
      },
    }).then(res => {
      setLoading(false);
    });
  }, [tab]);
  return (
    <AppScreenBackground>
      <AppScreenBackground.Header
        rightItem={
          <ButtonAdd.Round
            onPress={() => navigation.navigate('AddEventScreen')}
          />
        }>
        Events
      </AppScreenBackground.Header>

      <AppScreenBackground.Body>
        <SearchBar
          onFilterPress={handleFilter}
          placeholder="Search events..."
          reverse={order == -1 ? false : true}
          filterDisabled={loading}
          searchTxt={search}
          setSearchTxt={t => {
            setSearch(t);
            debouncedFetchResults(t);
          }}
        />
        <TopTabBar
          tabsList={tabsList}
          selected={tab}
          setSelected={setTab}
          showBottomBorder
        />
        {loading ? (
          <EventsListSkeleton />
        ) : (
          <FlashList
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.2}
            keyExtractor={item => item._id}
            data={eventsList}
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
                  eventsList?.length < eventsPagination.total &&
                  eventsList?.length !== 0
                    ? mS(120)
                    : mS(10)
                }
              />
            )}
            renderItem={({item}) => (
              <RowCard.Event
                title={item?.name}
                subTitle={item?.client?.name}
                venue={item?.venue?.name}
                date={`${
                  item?.time_slots?.length > 0 &&
                  item?.time_slots?.map((v, ind) =>
                    ind != 0
                      ? ' ' + moment(v?.date).format('MMM DD, YYYY')
                      : '' + moment(v?.date).format('MMM DD, YYYY'),
                  )
                }`}
                onPress={() =>
                  navigation.navigate('EventDetailScreen', {id: item?._id})
                }
              />
            )}
          />
        )}
      </AppScreenBackground.Body>
    </AppScreenBackground>
  );
};

export default EventsMainScreen;

const styles = StyleSheet.create({});
