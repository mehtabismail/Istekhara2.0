import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AppScreenBackground from '@/components/AppScreenBackground';
import {useTheme} from '@/hooks';
import ButtonDelete from '@/components/ButtonDelete';
import {Container, Row} from '@/components/UI/Layout';
import ButtonAdd from '@/components/ButtonAdd';
import {FlashList} from '@shopify/flash-list';
import {getStringWithCount, mS} from '@/utils/functions';
import {
  useDeleteShiftMutation,
  useLazyGetSingleShiftQuery,
} from '@/services/modules/Events/shift';
import {useLazyGetTeamsListQuery} from '@/services/modules/Events/team';
import {useAppSelector} from '@/store';
import moment from 'moment';
import Loader from '@/components/Loader';
import {useDispatch} from 'react-redux';
import {setSelectedShift, setTeamsList} from '@/store/events';
import InfoModal, {INFO_MODAL} from '@/components/InfoModal';
import Button from '@/components/Button';
import EmptyListComponent from '@/components/EmptyListComponent';

const TeamsListScreen = ({navigation, route}: any) => {
  const {Fonts, Images, Gutters, Layout, Colors} = useTheme();
  const [getSingleShift] = useLazyGetSingleShiftQuery();
  const [getTeamsList] = useLazyGetTeamsListQuery();
  const [deleteShift] = useDeleteShiftMutation();
  const dispatch = useDispatch();
  const {_id} = route?.params;
  const selectedShift = useAppSelector(state => state.events.selectedShift);
  const teamsList = useAppSelector(state => state.events.teamsList);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState<INFO_MODAL>('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getSingleShift({_id});
    await getTeamsList({params: {shift: _id}});
    setRefreshing(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteShift({_id}).then(res => {
      setLoading(false);
      if (res?.data?.message) {
        setShowModal('success');
      }
    });
  };

  const getData = async () => {
    setLoading(true);
    await getSingleShift({_id});
    await getTeamsList({params: {shift: _id}});
    setLoading(false);
  };

  useEffect(() => {
    getData();
    return () => {
      dispatch(setTeamsList([]));
      dispatch(setSelectedShift({}));
    };
  }, []);

  if (loading) {
    return (
      <AppScreenBackground>
        <Loader />
      </AppScreenBackground>
    );
  }

  return (
    <AppScreenBackground>
      {showModal == 'success' ? (
        <InfoModal>
          <InfoModal.Success
            customButton={
              <Button title="CONTINUE" onPress={() => navigation?.goBack()} />
            }
            onPress={() => navigation?.goBack()}>
            <Text
              style={[
                Fonts.OpenSans20_Regular_DBDBDB,
                Fonts.textCenter,
                {color: Colors.blackPrimary_111111},
              ]}>
              You have successfully deleted{' '}
              <Text style={[Fonts.OpenSans20_Bold_111111]}>
                {selectedShift?.name + '.'}
              </Text>
            </Text>
          </InfoModal.Success>
        </InfoModal>
      ) : showModal == 'confirmation' ? (
        <InfoModal>
          <InfoModal.Confirmation
            messageText="Are you sure you want to delete "
            highlightText={selectedShift?.name + '?'}
            cancelPress={() => setShowModal('')}
            yesPress={handleDelete}
            isLoading={loading}
          />
        </InfoModal>
      ) : (
        <>
          <AppScreenBackground.Header
            backPress={() => navigation.goBack()}
            subTilte={
              selectedShift?.date &&
              `${moment(selectedShift?.date).format('DD MMMM YYYY')} - ${
                selectedShift?.start_time
              } - ${selectedShift?.end_time}`
            }
            rightItem={
              <ButtonDelete
                disabled={loading}
                onPress={() => setShowModal('confirmation')}
              />
            }>
            {selectedShift?.name || 'Loading...'}
          </AppScreenBackground.Header>
          <AppScreenBackground.Body>
            <Container style={[Layout.fill]}>
              <Row justify="between" style={[Gutters.smallBMargin]}>
                <Text style={[Fonts.OpenSans20_Bold_111111, Fonts.gray707070]}>
                  Teams
                </Text>
                <Row>
                  <Text
                    style={[
                      Fonts.OpenSans14_Regular_DBDBDB,
                      Fonts.black_111111,
                      Gutters.xSmallRMargin,
                    ]}>
                    {getStringWithCount(teamsList?.length, 'Team')}
                  </Text>
                  <ButtonAdd.Rectangular
                    onPress={() => navigation.navigate('AddNewTeamScreen')}
                    title="+ Add Team"
                    variant="yellow"
                  />
                </Row>
              </Row>

              <View
                style={{
                  borderTopLeftRadius: mS(26),
                  borderTopRightRadius: mS(26),
                  overflow: 'hidden',
                  flex: 1,
                }}>
                <FlashList
                  data={teamsList}
                  estimatedItemSize={80}
                  keyExtractor={item => item?._id?.toString()}
                  ListEmptyComponent={EmptyListComponent}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  renderItem={({item, index}) => {
                    return (
                      <ItemRow
                        onPress={() =>
                          navigation.navigate('TeamDetailsScreen', {
                            _id: item?._id,
                            name: item?.name,
                            shiftCount: `${item?.members?.length}/${item?.limit} Shifts`,
                          })
                        }
                        item={item}
                        index={index}
                        length={teamsList?.length}
                      />
                    );
                  }}
                />
              </View>
            </Container>
          </AppScreenBackground.Body>
        </>
      )}
    </AppScreenBackground>
  );
};

export default TeamsListScreen;

const ItemRow = ({
  item,
  index,
  length,
  onPress,
}: {
  item: any;
  index: number;
  length: number;
  onPress: () => void;
}) => {
  const {Fonts, Gutters, Layout, Colors} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        Layout.rowHCenter,
        Gutters.smallVPadding,
        Gutters.xLittleHPadding,
        {
          backgroundColor: Colors.yellowLite_FFFAEA,
          borderBottomColor: Colors.gray_DBDBDB,
          borderBottomLeftRadius: index == length - 1 ? mS(26) : 0,
          borderBottomRightRadius: index == length - 1 ? mS(26) : 0,
          borderBottomWidth: index < length - 1 ? mS(1) : 0,
        },
      ]}>
      <Text
        numberOfLines={1}
        style={[
          Fonts.OpenSans20_Regular_DBDBDB,
          Fonts.black_111111,
          Gutters.tinyRMargin,
          {flex: 3, textTransform: 'capitalize'},
        ]}>
        {item?.name}
      </Text>
      <Row style={[{flex: 2}]}>
        <Text
          numberOfLines={1}
          style={[
            Fonts.OpenSans12_Regular_111111,
            Fonts.gray707070,
            Layout.fill,
          ]}>
          {item?.limit - item?.members?.length == 0
            ? 'Full'
            : `${item?.limit - item?.members?.length} available`}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            Fonts.OpenSans20_Regular_DBDBDB,
            Fonts.black_111111,
            Layout.fill,
            Fonts.textRight,
          ]}>
          {item?.members?.length}/{item?.limit}
        </Text>
      </Row>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {},
});
