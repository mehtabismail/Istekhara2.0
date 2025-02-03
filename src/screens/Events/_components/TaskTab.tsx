import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTheme} from '@/hooks';
import {Box, Row} from '@/components/UI/Layout';
import {Colors} from '@/theme/Variables';
import {getStringWithCount, mS} from '@/utils/functions';
import ButtonAdd from '@/components/ButtonAdd';
import RowCard from '@/components/RowCard/RowCard';
import {useAppSelector} from '@/store';
import EmptyListComponent from '@/components/EmptyListComponent';
import moment from 'moment';
import {
  useDeleteTaskMutation,
  useLazyGetTaskQuery,
} from '@/services/modules/Events/team';
import {INFO_MODAL} from '@/components/InfoModal';
import {DEL_TYPE} from '../TeamDetailsScreen';
import {useNavigation} from '@react-navigation/native';
import SheetRowContent from '@/components/SheetRowContent';
import BottomSheetComponent, {
  sheetTypes,
} from '@/components/BottomSheetComponent';

interface PROPS {
  id: string;
  setSelectedTask: React.Dispatch<any>;
  setShowModal: React.Dispatch<React.SetStateAction<INFO_MODAL>>;
  setDelType: React.Dispatch<React.SetStateAction<DEL_TYPE>>;
}

const TaskTab = ({id, setSelectedTask, setDelType, setShowModal}: PROPS) => {
  const {Gutters, Fonts, Colors, Layout, Images} = useTheme();
  const {navigate, goBack}: any = useNavigation();
  const [getTask] = useLazyGetTaskQuery();
  const taskList = useAppSelector(state => state.events.taskList);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const sheetRef = useRef<sheetTypes>(null);

  const onRefresh = async () => {
    setRefreshing(true);
    await getTask({params: {team: id}}).then(res => {
      setRefreshing(false);
    });
  };

  const handleItemPress = (item: any) => {
    if (item?.status == 'open') {
      if (item?._id == selectedItem?._id) {
        setSelectedItem(item);
        sheetRef.current?.show();
      } else {
        setSelectedItem(item);
      }
    }
  };

  useEffect(() => {
    if (selectedItem?._id) {
      sheetRef.current?.show();
    }
  }, [selectedItem]);

  return (
    <View style={[Layout.fill]}>
      <Box
        style={[Gutters.smallHPadding, styles.border, Gutters.xLittleBPadding]}>
        <Row>
          <Text
            numberOfLines={1}
            style={[
              Fonts.OpenSans20_Bold_111111,
              Fonts.gray707070,
              Layout.fill,
            ]}>
            Tasks
          </Text>
          <Text
            numberOfLines={1}
            style={[
              Fonts.OpenSans14_Regular_DBDBDB,
              Fonts.black_111111,
              Gutters.smallRMargin,
            ]}>
            {getStringWithCount(taskList?.length, 'Task')}
          </Text>
          <ButtonAdd.Rectangular
            size="small"
            variant="yellow"
            title="+ Add Task"
            onPress={() => navigate('AddTaskScreen' as never)}
          />
        </Row>
      </Box>
      <FlatList
        data={taskList}
        ListEmptyComponent={EmptyListComponent}
        keyExtractor={item => item?._id}
        removeClippedSubviews={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item, index}: any) => {
          return (
            <RowCard.Task
              title={item?.name}
              status={item?.status}
              editPress={() =>
                navigate('AddTaskScreen', {task: item, isEdit: true})
              }
              delPress={() => {
                setShowModal('confirmation');
                setDelType('task');
                setSelectedTask(item);
              }}
              completionDate={moment(item?.completed_at).format('DD MMMM YYYY')}
              whoComplete={`${item?.completed_by?.first_name} ${item?.completed_by?.last_name}`}
              onPress={() => handleItemPress(item)}
            />
          );
        }}
      />
      <BottomSheetComponent ref={sheetRef}>
        <View style={[Gutters.xRegularHPadding, Gutters.xSmallTPadding]}>
          <Text
            style={[
              Fonts.OpenSans20_Bold_111111,
              Fonts.textCenter,
              Gutters.tinyBMargin,
            ]}>
            {selectedItem?.name}
          </Text>
          {/* <Text
            style={[
              Fonts.OpenSans12_Regular_111111,
              Fonts.gray707070,
              Fonts.textCenter,
              Gutters.littleBMargin,
            ]}>
            Online
          </Text> */}
          <SheetRowContent
            iconSize={mS(25)}
            Icon={Images.svgIcon.checkOutline}
            title={'Mark as Completed'}
            titleColor={Colors.green_45A300}
            onPress={() => {
              sheetRef?.current?.hide();
              setShowModal('confirmation');
              setDelType('taskComplete');
              setSelectedTask(selectedItem);
            }}
          />
          <SheetRowContent
            iconSize={mS(25)}
            Icon={Images.svgIcon.deleteCircle}
            title="Delete Task"
            onPress={() => {
              sheetRef?.current?.hide();
              setShowModal('confirmation');
              setDelType('task');
              setSelectedTask(selectedItem);
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

export default TaskTab;

const styles = StyleSheet.create({
  border: {
    borderBottomColor: Colors.gray_F2F2F2,
    borderBottomWidth: mS(1.5),
  },
});
