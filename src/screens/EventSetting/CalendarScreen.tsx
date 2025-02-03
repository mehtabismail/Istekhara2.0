import {RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AppScreenBackground from '@/components/AppScreenBackground';
import ButtonAdd from '@/components/ButtonAdd';
import CalendarComponent from '@/components/CalendarComponent';
import CustomScroll from '@/components/CustomScroll';
import {useTheme} from '@/hooks';
import SearchBar from '@/components/SearchBar';
import RowCard from '@/components/RowCard/RowCard';
import {getApiFormattedDate} from '@/utils/functions';
import {useAppSelector} from '@/store';
import {
  useLazyGetCalenderEventsListQuery,
  useLazyGetEventShiftsQuery,
} from '@/services/modules/EventSetting/calendarEvents';
import SkeletonLoader from './_components/SkeletonLoader';
import CalendarSkeleton from './_components/CalendarSkeleton';
import moment from 'moment';
import {FlashList} from '@shopify/flash-list';
import EmptyListComponent from '@/components/EmptyListComponent';
import ListSkeleton from './_components/ListSkeleton';
import {debounce} from 'lodash';

const CalendarScreen = ({navigation}: any) => {
  const {Gutters} = useTheme();
  const [getCalendarShifts] = useLazyGetCalenderEventsListQuery();
  const [getEventShifts] = useLazyGetEventShiftsQuery();
  const {markedCalendarDates, eventShifts} = useAppSelector(
    state => state.eventSetting,
  );
  const [initialLoading, setInitialLoading] = useState(false);
  const [shiftLoading, setShiftLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [order, setOrder] = useState(false);
  const [sort, setSort] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // console.log('selected==>>', selectedDate);

  const onDayPress = async (date: any) => {
    setSelectedDate(date.dateString);
    setShiftLoading(true);
    await getEventShifts({
      date: date.dateString,
      search: searchText,
      order,
      sort,
    });
    setShiftLoading(false);
  };

  const handleFilter = async () => {
    setFilterLoading(true);
    await getEventShifts({
      date: selectedDate,
      search: searchText,
      order: !order,
      sort: 'name',
    });
    setOrder(!order);
    setSort('name');
    setFilterLoading(false);
  };

  const debouncedFetchResults = useCallback(
    debounce(text => {
      setFilterLoading(true);
      getEventShifts({date: selectedDate, search: text, order, sort}).then(
        res => {
          setFilterLoading(false);
        },
      );
    }, 500),
    [selectedDate, order, sort],
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await getEventShifts({date: selectedDate, search: searchText, order, sort});
    setRefreshing(false);
  };

  const getData = async () => {
    setInitialLoading(true);
    await getCalendarShifts({});
    await getEventShifts({
      date: getApiFormattedDate(new Date()),
      search: searchText,
      order,
      sort,
    });
    setSelectedDate(getApiFormattedDate(new Date()));
    setInitialLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <AppScreenBackground>
      <AppScreenBackground.Header
        backPress={() => navigation.goBack()}
        rightItem={<ButtonAdd.Round onPress={() => console.log('first')} />}>
        Calendars
      </AppScreenBackground.Header>
      <AppScreenBackground.Body>
        <CustomScroll
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {initialLoading ? (
            <>
              <CalendarSkeleton />
              <SkeletonLoader />
            </>
          ) : (
            <>
              <CalendarComponent
                markedDates={markedCalendarDates}
                selectedDate={selectedDate}
                onDayPress={onDayPress}
                containerStyle={[Gutters.smallVMargin, Gutters.xLittleHMargin]}
              />
              {shiftLoading ? (
                <SkeletonLoader />
              ) : (
                <>
                  <SearchBar
                    searchTxt={searchText}
                    onFilterPress={handleFilter}
                    reverse={order}
                    filterDisabled={filterLoading}
                    setSearchTxt={t => {
                      setSearchText(t);
                      debouncedFetchResults(t);
                    }}
                  />
                  {filterLoading ? (
                    <ListSkeleton />
                  ) : (
                    <FlashList
                      keyExtractor={item => item._id}
                      data={eventShifts}
                      showsVerticalScrollIndicator={false}
                      ListEmptyComponent={EmptyListComponent}
                      estimatedItemSize={200}
                      ListFooterComponent={() => <View style={{height: 30}} />}
                      renderItem={({item}) => (
                        <RowCard.Shift
                          onPress={() =>
                            navigation.navigate('CalendarDetails', {item})
                          }
                          date={
                            item?.shifts[0]?.date
                              ? moment(item?.shifts[0]?.date).format(
                                  'DD MMM, YYYY',
                                )
                              : 'N/A'
                          }
                          title={item?.name}
                          shiftLabel={'Shift'}
                          shiftTime={item?.shifts[0]?.name}
                          startTime={
                            item?.shifts[0]?.start_time
                              ? item?.shifts[0]?.start_time
                              : '00:00'
                          }
                          endTime={
                            item?.shifts[0]?.end_time
                              ? item?.shifts[0]?.end_time
                              : '00:00'
                          }
                        />
                      )}
                    />
                  )}
                </>
              )}
            </>
          )}
        </CustomScroll>
      </AppScreenBackground.Body>
    </AppScreenBackground>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({});
