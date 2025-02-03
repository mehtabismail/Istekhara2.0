import {handleApiError} from '@/utils/functions';
import {api} from '../../api';
import {
  deleteTask,
  deleteTeam,
  setSelectedTeam,
  setTaskList,
  setTeamsList,
} from '@/store/events';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    createTeam: build.mutation<any, any>({
      query: ({payload}) => {
        return {
          url: `multiple-team`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['getEvents', 'getTeamsList', 'getEventShifts'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    getTeamsList: build.query<any, any>({
      query: ({params}) => {
        return {
          url: `team`,
          method: 'GET',
          params,
        };
      },
      providesTags: ['getTeamsList'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
          if (response?.data?.teams) {
            dispatch(setTeamsList(response?.data?.teams));
          }
        } catch (error: any) {
          dispatch(setTeamsList([]));
          handleApiError(error);
        }
      },
    }),
    getSingleTeam: build.query<any, any>({
      query: ({_id}) => {
        return {
          url: `team/${_id}`,
          method: 'GET',
        };
      },
      providesTags: ['getSingleTeam'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
          if (response?.data?.team) {
            dispatch(setSelectedTeam(response?.data?.team));
          }
        } catch (error: any) {
          dispatch(setSelectedTeam({}));
          handleApiError(error);
        }
      },
    }),
    deleteTeam: build.mutation<any, any>({
      query: ({_id}) => {
        return {
          url: `team/${_id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['getEventShifts'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {_id} = arg;
          const response: any = await queryFulfilled;
          if (response?.data?.message) {
            dispatch(deleteTeam(_id));
          }
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    updateTeam: build.mutation<any, any>({
      query: ({_id, payload}) => {
        return {
          url: `team/${_id}`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['getSingleTeam', 'getEventShifts', 'getTeamsList'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {_id} = arg;
          const response: any = await queryFulfilled;
          // if (response?.data?.message) {
          //   dispatch(deleteTeam(_id));
          // }
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    createTask: build.mutation<any, any>({
      query: ({payload}) => {
        return {
          url: `task`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['getTaskList'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    updateTask: build.mutation<any, any>({
      query: ({payload, _id}) => {
        return {
          url: `task/${_id}`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['getTaskList'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    getTask: build.query<any, any>({
      query: ({params}) => {
        return {
          url: `task`,
          method: 'GET',
          params,
        };
      },
      providesTags: ['getTaskList'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
          if (response?.data?.tasks) {
            dispatch(setTaskList(response?.data?.tasks));
          }
        } catch (error: any) {
          dispatch(setTaskList([]));
          handleApiError(error);
        }
      },
    }),
    deleteTask: build.mutation<any, any>({
      query: ({_id}) => {
        return {
          url: `task/${_id}`,
          method: 'DELETE',
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {_id} = arg;
          const response: any = await queryFulfilled;
          if (response?.data?.message) {
            dispatch(deleteTask(_id));
          }
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    setCalendar: build.query<any, any>({
      query: ({endpoint, code, token}) => {
        return {
          url: `${endpoint}?code=${code}&token=${token}`,
          method: 'GET',
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateTeamMutation,
  useLazyGetTeamsListQuery,
  useLazyGetSingleTeamQuery,
  useDeleteTeamMutation,
  useLazyGetTaskQuery,
  useDeleteTaskMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useUpdateTeamMutation,
  useLazySetCalendarQuery,
} = userApi;
