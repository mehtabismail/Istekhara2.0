import {RefreshControl, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AppScreenBackground from '@/components/AppScreenBackground';
import ButtonAdd from '@/components/ButtonAdd';
import SearchBar from '@/components/SearchBar';
import {debounce} from 'lodash';
import {useLazyGetVenuesListQuery} from '@/services/modules/EventSetting/venue';
import SkeletonLoader from './_components/SkeletonLoader';
import ListSkeleton from './_components/ListSkeleton';
import {FlashList} from '@shopify/flash-list';
import {useAppSelector} from '@/store';
import EmptyListComponent from '@/components/EmptyListComponent';
import PaginationLoader from '@/components/PaginationLoader';
import RowCard from '@/components/RowCard/RowCard';

const VanuesListScreen = ({navigation}: any) => {
  const [getVenues] = useLazyGetVenuesListQuery();
  const venuesListPagination = useAppSelector(
    state => state.eventSetting?.venuesListPagination,
  );
  const venuesList = useAppSelector(state => state.eventSetting?.venuesList);
  const [paginationLoader, setPaginationLoader] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [order, setOrder] = useState(false);
  const [sort, setSort] = useState('');
  const [searchTxt, setSearchTxt] = useState('');

  const debouncedFetchResults = useCallback(
    debounce(text => {
      setSearchLoading(true);
      getVenues({skip: 0, limit: 10, search: text, order, sort}).then(res => {
        setSearchLoading(false);
      });
    }, 500),
    [order, sort],
  );

  const loadMoreData = () => {
    if (
      venuesList?.length < venuesListPagination.total &&
      venuesList?.length !== 0
    ) {
      setPaginationLoader(true);
      getVenues({
        skip: venuesList?.length,
        limit: 10,
        search: searchTxt,
        order,
        sort,
      }).then(res => {
        setPaginationLoader(false);
      });
    }
  };

  const handleFilter = async () => {
    setSearchLoading(true);
    await getVenues({
      skip: 0,
      limit: 10,
      search: searchTxt,
      order: !order,
      sort: 'name',
    });
    setOrder(!order);
    setSort('name');
    setSearchLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getVenues({skip: 0, limit: 10, search: searchTxt, order, sort});
    setRefreshing(false);
  };

  useEffect(() => {
    setInitialLoading(true);
    getVenues({skip: 0, limit: 10, search: searchTxt, order, sort}).then(
      res => {
        setInitialLoading(false);
      },
    );
  }, []);
  return (
    <AppScreenBackground>
      <AppScreenBackground.Header
        backPress={() => navigation.goBack()}
        rightItem={
          <ButtonAdd.Round
            onPress={() => navigation.navigate('AddUpdateVanueScreen')}
          />
        }>
        Venues
      </AppScreenBackground.Header>
      {initialLoading ? (
        <SkeletonLoader />
      ) : (
        <AppScreenBackground.Body>
          <SearchBar
            searchTxt={searchTxt}
            setSearchTxt={t => {
              setSearchTxt(t);
              debouncedFetchResults(t);
            }}
            onFilterPress={handleFilter}
            reverse={order}
            filterDisabled={searchLoading}
          />
          {searchLoading ? (
            <ListSkeleton />
          ) : (
            <FlashList
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.2}
              keyExtractor={item => item._id}
              data={venuesList}
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
                    venuesList?.length < venuesListPagination.total &&
                    venuesList?.length !== 0
                      ? 120
                      : 10
                  }
                />
              )}
              renderItem={({item}) => (
                <RowCard.TitleSubTitle
                  title={item?.name}
                  subTitle={item?.address}
                  onPress={() =>
                    navigation.navigate('AddUpdateVanueScreen', {
                      item,
                      isEdit: true,
                    })
                  }
                />
              )}
            />
          )}
        </AppScreenBackground.Body>
      )}
    </AppScreenBackground>
  );
};

export default VanuesListScreen;

const styles = StyleSheet.create({});
