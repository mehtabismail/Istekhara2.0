import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTheme} from '@/hooks';
import BottomSheetComponent, {
  sheetTypes,
} from '@/components/BottomSheetComponent';
import SheetRowContent from '@/components/SheetRowContent';
import {getStringWithCount, mS} from '@/utils/functions';
import RowCard from '@/components/RowCard/RowCard';
import {Box, Row} from '@/components/UI/Layout';
import {Colors} from '@/theme/Variables';
import ButtonAdd from '@/components/ButtonAdd';
import {
  useLazyGetSingleTeamQuery,
  useUpdateTeamMutation,
} from '@/services/modules/Events/team';
import Loader from '@/components/Loader';
import {useAppSelector} from '@/store';
import {FlashList} from '@shopify/flash-list';
import moment from 'moment';
import EmptyListComponent from '@/components/EmptyListComponent';
import {
  useAddRemoveChiefMutation,
  useCheckInMutation,
  useCheckOutMutation,
  useRemoveTeamMemberMutation,
} from '@/services/modules/Events/user';
import momentTZ from 'moment-timezone';
import {toast} from '@/utils/toast';
import {INFO_MODAL} from '@/components/InfoModal';
import {DEL_TYPE} from '../TeamDetailsScreen';
import {useNavigation} from '@react-navigation/native';
import ListSelectionModal, {listModalType} from './ListSelectionModal';

interface PROPS {
  id: string;
  setTeamLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<INFO_MODAL>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<any>>;
  setDelType: React.Dispatch<React.SetStateAction<DEL_TYPE>>;
  teamLoading: boolean;
}

type ATTENDENCE = 'in' | 'out';

const MembersTab = ({
  id,
  setTeamLoading,
  teamLoading,
  setShowModal,
  setSelectedUser,
  setDelType,
}: PROPS) => {
  const {Gutters, Fonts, Colors, Layout, Images} = useTheme();
  const {goBack} = useNavigation();
  const [getTeam] = useLazyGetSingleTeamQuery();
  const [checkIn] = useCheckInMutation();
  const [checkOut] = useCheckOutMutation();
  const [updateTeam] = useUpdateTeamMutation();
  const [addRemoveChief] = useAddRemoveChiefMutation();
  const selectedTeam = useAppSelector(state => state.events.selectedTeam);
  const selectedEvent = useAppSelector(state => state.events.selectedEvent);
  const selectedShift = useAppSelector(state => state.events.selectedShift);
  const users = useAppSelector(state => state.common.users);
  const sheetRef = useRef<sheetTypes>(null);
  const listRef = useRef<listModalType>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [listModalData, setListModalData] = useState([
    {
      limit: 0,
      members: [],
    },
  ]);
  const [listData, setListData] = useState<any[]>(users);

  const addMembers = async () => {
    const members = listModalData[0].members?.map(itm => ({user: itm._id}));
    setLoading(true);
    updateTeam({_id: selectedTeam?._id, payload: {users: members}}).then(
      res => {
        setLoading(false);
        if (res?.data?.item) {
        }
      },
    );
  };

  const handlePress = item => {
    if (item?._id == selectedMember?._id) {
      setSelectedMember(item);
      setSelectedUser(item);
      sheetRef.current?.show();
    } else {
      setSelectedMember(item);
      setSelectedUser(item);
    }
  };

  const handleChief = (userID: string) => {
    sheetRef.current?.hide();
    setLoading(true);
    addRemoveChief({team_id: selectedTeam?._id, user_id: userID}).then(res => {
      setLoading(false);
    });
  };

  const handleCheckInOut = (attendence: ATTENDENCE) => {
    if (attendence == 'out') {
      let reqObj = {
        _id: selectedMember?.availability?._id,
        event_id: selectedEvent?.event?._id,
        team: selectedTeam?._id,
        shift: selectedShift?._id,
        user: selectedMember?.user?._id,
        check_in: selectedMember?.availability?.check_in,
        check_out:
          momentTZ(new Date())
            .tz('Pacific/Auckland')
            .format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z',
        date: selectedMember?.availability?.date,
      };
      sheetRef.current?.hide();
      setLoading(true);
      checkOut({_id: selectedMember?.availability?._id, payload: reqObj}).then(
        res => {
          setLoading(false);
          if (res?.data?.item?._id) {
            toast.success('User checked out successfully');
          }
        },
      );
    } else {
      let reqObj = {
        user: selectedMember?.user?._id,
        event_id: selectedEvent?.event?._id,
        shift: selectedShift?._id,
        team: selectedTeam?._id,
        check_in:
          momentTZ(new Date())
            .tz('Pacific/Auckland')
            .format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z',
        date:
          momentTZ(new Date())
            .tz('Pacific/Auckland')
            .format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z',
      };
      sheetRef.current?.hide();
      setLoading(true);
      checkIn({payload: reqObj}).then(res => {
        setLoading(false);
        if (res?.data?.availability?._id) {
          toast.success('User checked in successfully');
        }
      });
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getTeam({_id: id});
    setRefreshing(false);
  };

  const applyFilter = () => {
    const users2Ids = new Set(
      selectedTeam?.members?.map(itm => itm?.user?._id),
    );
    const filteredUsers = users.filter(itm => !users2Ids.has(itm._id));
    setListData(filteredUsers);
  };

  useEffect(() => {
    if (selectedMember?._id) {
      sheetRef.current?.show();
    }
  }, [selectedMember?._id]);

  useEffect(() => {
    setListModalData([
      {
        limit: selectedTeam?.limit - selectedTeam?.members?.length,
        members: [],
      },
    ]);
    applyFilter();
  }, [selectedTeam]);

  return (
    <View style={[Layout.fill]}>
      {teamLoading || loading ? (
        <Loader />
      ) : (
        <>
          <Box
            style={[
              Gutters.smallHPadding,
              styles.border,
              Gutters.xLittleBPadding,
            ]}>
            <Row>
              <Text
                numberOfLines={1}
                style={[
                  Fonts.OpenSans20_Bold_111111,
                  Fonts.gray707070,
                  Layout.fill,
                ]}>
                Members
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  Fonts.OpenSans14_Regular_DBDBDB,
                  Fonts.black_111111,
                  Gutters.smallRMargin,
                ]}>
                {getStringWithCount(selectedTeam?.members?.length, 'Member')}
              </Text>
              <ButtonAdd.Rectangular
                size="small"
                variant="yellow"
                title="+ Add Member"
                onPress={() => {
                  selectedTeam?.limit - selectedTeam?.members?.length == 0
                    ? toast.error('Members limit has already been reached.')
                    : listRef.current?.show();
                }}
              />
            </Row>
          </Box>
          <FlatList
            data={selectedTeam?.members}
            ListEmptyComponent={EmptyListComponent}
            keyExtractor={item => item?._id}
            removeClippedSubviews={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item, index}: any) => {
              return (
                <RowCard.Members
                  inTime={
                    item?.availability?.check_in
                      ? moment(item?.availability?.check_in)
                          .utc()
                          .format('h:mma')
                      : ''
                  }
                  outTime={
                    item?.availability?.check_out
                      ? moment(item?.availability?.check_out)
                          .utc()
                          .format('h:mma')
                      : ''
                  }
                  title={item?.user?.first_name + ' ' + item?.user?.last_name}
                  img={item?.user?.photo}
                  isCheif={item?.crew_chief}
                  isOnline
                  onPress={() => handlePress(item)}
                />
              );
            }}
          />
        </>
      )}

      <ListSelectionModal
        data={listModalData}
        setData={setListModalData}
        listIndex={0}
        listData={listData} //}
        ref={listRef}
        errorMsg="Members limit has been reached."
        onSubmit={addMembers}
      />

      <BottomSheetComponent ref={sheetRef}>
        <View style={[Gutters.xRegularHPadding, Gutters.xSmallTPadding]}>
          <Text
            style={[
              Fonts.OpenSans20_Bold_111111,
              Fonts.textCenter,
              Gutters.tinyBMargin,
            ]}>
            {selectedMember?.user?.first_name +
              ' ' +
              selectedMember?.user?.last_name}
          </Text>
          <Text
            style={[
              Fonts.OpenSans12_Regular_111111,
              Fonts.gray707070,
              Fonts.textCenter,
              Gutters.littleBMargin,
            ]}>
            Online
          </Text>
          <SheetRowContent
            iconHeight={mS(16.54)}
            iconWidth={mS(30)}
            Icon={Images.svgIcon.crown}
            title={
              selectedMember?.crew_chief
                ? 'Un-Assign as a Crew Chief'
                : 'Assign as a Crew Chief'
            }
            onPress={() => handleChief(selectedMember?.user?._id)}
          />
          {!selectedMember?.availability ||
          (selectedMember?.availability?.check_in &&
            !selectedMember?.availability?.check_out) ? (
            <SheetRowContent
              iconSize={mS(27)}
              Icon={Images.svgIcon.clock}
              title={
                selectedMember?.availability?.check_in
                  ? 'Check-Out'
                  : 'Check-In'
              }
              onPress={() =>
                handleCheckInOut(
                  selectedMember?.availability?.check_in ? 'out' : 'in',
                )
              }
            />
          ) : null}
          <SheetRowContent
            iconSize={mS(25)}
            Icon={Images.svgIcon.deleteCircle}
            title="Remove from team"
            onPress={() => {
              sheetRef?.current?.hide();
              setShowModal('confirmation');
              setDelType('member');
            }}
            titleColor={Colors.red_FF0000}
          />
          <SheetRowContent
            iconSize={mS(20)}
            Icon={Images.svgIcon.chevronLeft}
            title="Back"
            onPress={() => goBack()}
          />
        </View>
      </BottomSheetComponent>
    </View>
  );
};

export default MembersTab;

const styles = StyleSheet.create({
  border: {
    borderBottomColor: Colors.gray_F2F2F2,
    borderBottomWidth: mS(1.5),
  },
});
