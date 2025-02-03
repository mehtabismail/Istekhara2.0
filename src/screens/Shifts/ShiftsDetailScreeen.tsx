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
  useLazyGetShiftsDetailQuery,
} from '@/services/modules/StaffShifts/shifts';
import RoundBoxWrapper from '@/components/RoundBox/RoundBoxWrapper';
import RoundBoxShift from '@/components/RoundBox/RoundBoxShift';
import {useTheme} from '@/hooks';
import ContactDetail from '@/components/ContactDetail';
import TeamsDetail from './TeamsDetail';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ShiftsDetailScreen = ({navigation, route}: any) => {
  const {Gutters, Layout, Colors, Fonts, Images} = useTheme();

  const {header, shift_id} = route.params;
  const [getMyShifts] = useLazyGetMyShiftsListQuery();
  const [getShiftsDetail] = useLazyGetShiftsDetailQuery();
  const {shifts_detail} = useAppSelector(state => state.myShifts);
  const [tab, setTab] = useState(route?.params?.tab);
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

  useEffect(() => {
    setLoading(true);
    getShiftsDetail(shift_id).then(res => {
      setLoading(false);
    });
  }, [tab]);

  const Content = item => {
    return (
      <>
        {item?.event_id?.venue?.name && (
          <Text
            numberOfLines={1}
            style={[
              Fonts.OpenSans14_Regular_DBDBDB,
              Gutters.tinyTMargin,
              {color: Colors.gray_9D9D9D},
            ]}>
            {item?.event_id?.venue?.name}
          </Text>
        )}
        <Text
          numberOfLines={1}
          style={[
            Fonts.OpenSans14_Regular_DBDBDB,
            Gutters.tinyTMargin,
            {color: Colors.gray_9D9D9D},
          ]}>
          {moment(item?.date).format('DD MMMM YYYY') ?? ''}
        </Text>
      </>
    );
  };

  const JobContent = item => {
    return (
      <>
        <Text
          numberOfLines={1}
          style={[
            Fonts.OpenSans14_Bold_DBDBDB,
            Gutters.tinyTMargin,
            {color: Colors.gray_2F2F2F},
          ]}>
          Job Description:
        </Text>

        <View style={[Layout.row]}>
          <Text
            numberOfLines={1}
            style={[
              Fonts.OpenSans12_Bold_111111,
              Gutters.tinyTMargin,
              {color: Colors.gray_2F2F2F},
            ]}>
            {'Client Name: '}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              Fonts.OpenSans12_Regular_111111,
              Gutters.tinyTMargin,
              {color: Colors.gray_2F2F2F},
            ]}>
            {item?.event_id?.client?.contact_persons[0]?.first_name +
              ' ' +
              item?.event_id?.client?.contact_persons[0]?.last_name}
          </Text>
        </View>

        <ContactDetail
          email={item?.event_id?.client?.contact_persons[0]?.email}
          phone={item?.event_id?.client?.contact_persons[0]?.phone}
        />
      </>
    );
  };

  const VanueContent = item => {
    return (
      <>
        <View style={[Layout.row, Layout.fill]}>
          <Text
            numberOfLines={1}
            style={[
              Fonts.OpenSans12_Bold_111111,
              Gutters.tinyTMargin,
              {color: Colors.gray_2F2F2F},
            ]}>
            {'Vanue: '}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              Layout.fill,
              Fonts.OpenSans12_Regular_111111,
              Gutters.tinyTMargin,
              {color: Colors.gray_2F2F2F},
            ]}>
            {item?.event_id?.venue?.name}
          </Text>
        </View>

        <View style={[Layout.row, Layout.fill]}>
          <Text
            numberOfLines={1}
            style={[
              Fonts.OpenSans12_Bold_111111,
              Gutters.tinyTMargin,
              {color: Colors.gray_2F2F2F},
            ]}>
            {'Location: '}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              Layout.fill,
              Fonts.OpenSans12_Regular_111111,
              Gutters.tinyTMargin,
              {color: Colors.gray_2F2F2F},
            ]}>
            {item?.event_id?.venue?.address}
          </Text>
        </View>

        <View style={[Layout.row, Layout.fill]}>
          <Text
            numberOfLines={1}
            style={[
              Fonts.OpenSans12_Bold_111111,
              Gutters.tinyTMargin,
              {color: Colors.gray_2F2F2F},
            ]}>
            {'Venue Contact person: '}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              Layout.fill,
              Fonts.OpenSans12_Regular_111111,
              Gutters.tinyTMargin,
              {color: Colors.gray_2F2F2F},
            ]}>
            {item?.event_id?.venue?.contact_person_first_name +
              ' ' +
              item?.event_id?.venue?.contact_person_last_name}
          </Text>
        </View>

        <ContactDetail
          email={item?.event_id?.venue?.contact_person_email}
          phone={item?.event_id?.venue?.contact_person_phone}
        />
      </>
    );
  };

  return (
    <AppScreenBackground>
      <AppScreenBackground.Header backPress={() => navigation.goBack()}>
        {header}
      </AppScreenBackground.Header>
      <AppScreenBackground.Body>
        <TopTabBar
          tabsList={tabsList}
          selected={tab}
          setSelected={setTab}
          onPress={(value, index) => {
            setTab(value);
            route?.params?.setTab(value);
            // navigation.navigate('ShiftsScreen', {tab: value});
            navigation.goBack();
          }}
        />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          {loading ? (
            <EventsListSkeleton />
          ) : (
            <>
              <RoundBoxShift
                hideIcon
                hideBorder
                Content={() => Content(shifts_detail?.shift)}
                rightBtnTitle={`${shifts_detail?.shift?.shift_time} Shift`}
                rightBtnContent={`${shifts_detail?.shift?.start_time} - ${shifts_detail?.shift?.end_time}`}
                rightBtnRadius={tab == 'requests' ? 20 : 10}
                backgroundColor={Colors.gray_707070}
              />
              <RoundBoxShift
                hideIcon
                Content={() => JobContent(shifts_detail?.shift)}
              />
              <RoundBoxShift
                hideIcon
                Content={() => VanueContent(shifts_detail?.shift)}
              />
            </>
          )}
          <TeamsDetail data={shifts_detail} header={header} />
        </KeyboardAwareScrollView>
      </AppScreenBackground.Body>
    </AppScreenBackground>
  );
};

export default ShiftsDetailScreen;
