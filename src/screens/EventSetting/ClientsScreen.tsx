import {RefreshControl, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AppScreenBackground from '@/components/AppScreenBackground';
import ButtonAdd from '@/components/ButtonAdd';
import SearchBar from '@/components/SearchBar';
import {useAppSelector} from '@/store';
import {FlashList} from '@shopify/flash-list';
import {useLazyGetClientsListQuery} from '@/services/modules/EventSetting/client';
import moment from 'moment';
import SkeletonLoader from './_components/SkeletonLoader';
import {debounce} from 'lodash';
import ListSkeleton from './_components/ListSkeleton';
import PaginationLoader from '@/components/PaginationLoader';
import EmptyListComponent from '@/components/EmptyListComponent';
import RowCard from '@/components/RowCard/RowCard';

const ClientsScreen = ({navigation}: any) => {
  const {clientsList, clientsListPagination} = useAppSelector(
    state => state.eventSetting,
  );
  const [getClients] = useLazyGetClientsListQuery();
  const [initialLoading, setInitialLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [paginationLoader, setPaginationLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [order, setOrder] = useState(false);
  const [sort, setSort] = useState('');
  const [searchTxt, setSearchTxt] = useState('');

  const debouncedFetchResults = useCallback(
    debounce(text => {
      setSearchLoading(true);
      getClients({skip: 0, limit: 10, order, sort, search: text}).then(res => {
        setSearchLoading(false);
      });
    }, 500),
    [order, sort],
  );

  const loadMoreData = () => {
    if (
      clientsList?.length < clientsListPagination.total &&
      clientsList?.length !== 0
    ) {
      setPaginationLoader(true);
      getClients({
        skip: clientsList?.length,
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
    await getClients({
      skip: 0,
      limit: 10,
      sort: 'name',
      order: !order,
      search: searchTxt,
    });
    setOrder(!order);
    setSort('name');
    setSearchLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getClients({skip: 0, limit: 10, search: searchTxt, order, sort});
    setRefreshing(false);
  };

  useEffect(() => {
    setInitialLoading(true);
    getClients({skip: 0, limit: 10, search: searchTxt, order, sort}).then(
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
            onPress={() => navigation.navigate('AddUpdateClientScreen')}
          />
        }>
        Clients
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
              data={clientsList}
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
                    clientsList?.length < clientsListPagination.total &&
                    clientsList?.length !== 0
                      ? 120
                      : 10
                  }
                />
              )}
              renderItem={({item}) => (
                <RowCard.TitleSubTitle
                  title={item?.name}
                  subTitle={moment(item?.created_at).format('DD MMMM YYYY')}
                  onPress={() =>
                    navigation.navigate('AddUpdateClientScreen', {
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

export default ClientsScreen;

const styles = StyleSheet.create({});
