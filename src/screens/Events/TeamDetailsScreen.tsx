import {StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppScreenBackground from '@/components/AppScreenBackground';
import ButtonDelete from '@/components/ButtonDelete';
import TopTabBar from '@/components/TopTabBar';
import {Box, Row} from '@/components/UI/Layout';
import {useTheme} from '@/hooks';
import MembersTab from './_components/MembersTab';
import TaskTab from './_components/TaskTab';
import {useDispatch} from 'react-redux';
import {setSelectedTeam} from '@/store/events';
import {
  useDeleteTaskMutation,
  useDeleteTeamMutation,
  useLazyGetSingleTeamQuery,
  useLazyGetTaskQuery,
  useUpdateTaskMutation,
} from '@/services/modules/Events/team';
import InfoModal, {INFO_MODAL} from '@/components/InfoModal';
import Button from '@/components/Button';
import {useAppSelector} from '@/store';
import {useRemoveTeamMemberMutation} from '@/services/modules/Events/user';
import ListSelectionModal from './_components/ListSelectionModal';
import {useLazyGetUsersQuery} from '@/services/modules/Common/dropdownLists';

export type DEL_TYPE = 'team' | 'member' | 'task' | 'taskComplete' | '';

const TeamDetailsScreen = ({navigation, route}: any) => {
  const {Gutters, Fonts, Colors} = useTheme();
  const [deleteTeam, {isLoading}] = useDeleteTeamMutation();
  const [updateTask, {isLoading: completeLoading}] = useUpdateTaskMutation();
  const [removeMember, {isLoading: removeLoading}] =
    useRemoveTeamMemberMutation();
  const [deleteTask, {isLoading: taskDelLoading}] = useDeleteTaskMutation();
  const [getTeam] = useLazyGetSingleTeamQuery();
  const [getTask] = useLazyGetTaskQuery();
  const [getUsers] = useLazyGetUsersQuery();
  const {_id, shiftCount, name} = route?.params;
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('members');
  const [showModal, setShowModal] = useState<INFO_MODAL>('');
  const [delType, setDelType] = useState<DEL_TYPE>('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const selectedTeam = useAppSelector(state => state.events.selectedTeam);
  const [teamLoading, setTeamLoading] = useState(false);

  const handleDelete = () => {
    deleteTeam({_id}).then(res => {
      if (res?.data?.message) {
        setShowModal('success');
      }
    });
  };

  const handleRemove = () => {
    removeMember({
      team_id: selectedTeam?._id,
      user_id: selectedUser?.user?._id,
    }).then(res => {
      if (res?.data?.message) {
        setShowModal('success');
      }
    });
  };

  const markCompletask = async () => {
    updateTask({
      _id: selectedTask?._id,
      payload: {completed_task: true, status: 'completed'},
    }).then(res => {
      if (res?.data?.item) {
        setShowModal('');
      }
    });
  };

  const handleTaskDelete = async () => {
    deleteTask({_id: selectedTask?._id}).then(res => {
      if (res?.data?.message) {
        setShowModal('success');
      }
    });
  };

  const getData = async () => {
    setTeamLoading(true);
    await getTeam({_id});
    await getTask({params: {team: _id}});
    await getUsers({});
    setTeamLoading(false);
  };

  useEffect(() => {
    getData();
    return () => {
      dispatch(setSelectedTeam({}));
    };
  }, []);

  return (
    <AppScreenBackground>
      {showModal == 'success' ? (
        <InfoModal>
          <InfoModal.Success
            customButton={
              <Button
                title="CONTINUE"
                onPress={() => {
                  if (delType == 'team') {
                    navigation?.goBack();
                  } else if (delType == 'member') {
                    setShowModal('');
                    setDelType('');
                    setSelectedUser(null);
                  } else if (delType == 'task') {
                    setShowModal('');
                    setDelType('');
                    setSelectedTask(null);
                  }
                }}
              />
            }
            onPress={() => navigation?.goBack()}>
            <Text
              style={[
                Fonts.OpenSans20_Regular_DBDBDB,
                Fonts.textCenter,
                {color: Colors.blackPrimary_111111},
              ]}>
              {delType == 'member'
                ? 'You have successfully deleted a user, a confirmation email has been sent to the user.'
                : delType == 'team'
                ? 'You have successfully deleted '
                : delType == 'task'
                ? 'You have successfully deleted Task: '
                : ''}

              {(delType == 'team' || delType == 'task') && (
                <Text
                  style={[
                    Fonts.OpenSans20_Bold_111111,
                    {textTransform: 'capitalize'},
                  ]}>
                  {delType == 'team'
                    ? selectedTeam?.name
                    : delType == 'task'
                    ? selectedTask?.name
                    : ''}
                </Text>
              )}
            </Text>
          </InfoModal.Success>
        </InfoModal>
      ) : showModal == 'confirmation' ? (
        <InfoModal>
          <InfoModal.Confirmation
            icon={delType == 'taskComplete' ? 'check' : 'delete'}
            messageText={
              delType == 'member'
                ? 'Are you sure you want to remove '
                : delType == 'team'
                ? 'Are you sure you want to delete '
                : delType == 'task'
                ? 'Are you sure you want to delete task: '
                : delType == 'taskComplete'
                ? 'Are you sure you want to mark complete task:'
                : ''
            }
            highlightText={
              delType == 'member'
                ? `${selectedUser?.user?.first_name} ${selectedUser?.user?.last_name}?`
                : delType == 'team'
                ? selectedTeam?.name + '?'
                : delType == 'task'
                ? selectedTask?.name + '?'
                : delType == 'taskComplete'
                ? selectedTask?.name + '?'
                : ''
            }
            cancelPress={() => setShowModal('')}
            yesPress={() => {
              delType == 'member'
                ? handleRemove()
                : delType == 'team'
                ? handleDelete()
                : delType == 'task'
                ? handleTaskDelete()
                : delType == 'taskComplete'
                ? markCompletask()
                : null;
            }}
            isLoading={
              isLoading || removeLoading || taskDelLoading || completeLoading
            }
          />
        </InfoModal>
      ) : (
        <>
          <AppScreenBackground.Header
            backPress={() => navigation.goBack()}
            subTilte={
              teamLoading
                ? ''
                : selectedTeam?.members?.length + '/' + selectedTeam?.limit
            }
            rightItem={
              <ButtonDelete
                disabled={teamLoading}
                onPress={() => {
                  setShowModal('confirmation');
                  setDelType('team');
                }}
              />
            }>
            {teamLoading ? 'Loading...' : selectedTeam?.name || 'N/A'}
          </AppScreenBackground.Header>
          <AppScreenBackground.Body>
            <Box style={[Gutters.regularHPadding]}>
              <TopTabBar
                selected={selected}
                setSelected={setSelected}
                tabsList={[
                  {label: 'Members', value: 'members'},
                  {label: 'Tasks', value: 'tasks'},
                ]}
              />
            </Box>
            {selected == 'members' ? (
              <MembersTab
                id={_id}
                teamLoading={teamLoading}
                setTeamLoading={setTeamLoading}
                setShowModal={setShowModal}
                setSelectedUser={setSelectedUser}
                setDelType={setDelType}
              />
            ) : selected == 'tasks' ? (
              <TaskTab
                id={_id}
                setSelectedTask={setSelectedTask}
                setShowModal={setShowModal}
                setDelType={setDelType}
              />
            ) : null}
          </AppScreenBackground.Body>
        </>
      )}
    </AppScreenBackground>
  );
};

export default TeamDetailsScreen;

const styles = StyleSheet.create({});
