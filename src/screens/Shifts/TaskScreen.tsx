import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@/hooks';
import {FlashList} from '@shopify/flash-list';
import {mS} from '@/utils/functions';
import Button from '@/components/Button';
import AppScreenBackground from '@/components/AppScreenBackground';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import EventsListSkeleton from '../Events/_components/EventsListSkeleton';
import {useLazyGetTaskQuery} from '@/services/modules/Events/team';
import TaskBox from './TaskBox';
import EmptyListComponent from '@/components/EmptyListComponent';
import {useAppSelector} from '@/store';
import {
  useLazyGetTasksListQuery,
  useUpdateTaskStatusMutation,
} from '@/services/modules/StaffShifts/shifts';

const TaskScreen = ({navigation, route}: any) => {
  const {Gutters, Layout, Colors, Fonts, Images} = useTheme();
  const {header, team_id, team_name} = route.params;

  const {task_list} = useAppSelector(state => state.myShifts);
  const [getTaskList] = useLazyGetTasksListQuery();
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTaskList({
      params: {
        team: team_id,
      },
    }).then(res => {
      setLoading(false);
    });
  }, []);

  return (
    <AppScreenBackground>
      <AppScreenBackground.Header backPress={() => navigation.goBack()}>
        {header}
      </AppScreenBackground.Header>
      <AppScreenBackground.Body>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <Text
            numberOfLines={1}
            style={[
              Fonts.OpenSans20_Bold_111111,
              Gutters.smallHMargin,
              Gutters.xLittleVMargin,
              {color: Colors.gray_707070},
            ]}>
            {'Team Name: ' + team_name}
          </Text>
          {loading ? (
            <EventsListSkeleton />
          ) : (
            <FlashList
              onEndReachedThreshold={0.2}
              keyExtractor={(item: any) => item?._id}
              data={task_list}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={EmptyListComponent}
              estimatedItemSize={10}
              renderItem={({item}) => (
                <TaskBox
                  title={item?.name}
                  status={item?.status}
                  onPress={() =>
                    item?.status == 'open' &&
                    updateTaskStatus({
                      payload: {
                        completed_task: true,
                        status: 'completed',
                      },
                      id: item?._id,
                    })
                  }
                />
              )}
            />
          )}
        </KeyboardAwareScrollView>
      </AppScreenBackground.Body>
    </AppScreenBackground>
  );
};

export default TaskScreen;
