import {handleApiError} from '@/utils/functions';
import {api} from '../../api';
import {
  addMyShiftsList,
  addMyShiftsRequestsList,
  setMyShiftsList,
  setMyShiftsPagination,
  setMyShiftsRequestsList,
  setMyShiftsRequestsPagination,
  shiftsDetail,
  taskList,
} from '@/store/myShifts';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    getMyShiftsList: build.query<any, any>({
      query: ({params}: any) => {
        return {
          url: 'staff-shifts',
          method: 'GET',
          params,
        };
      },
      providesTags: ['getMyShifts'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {skip} = arg?.params;
          const response: any = await queryFulfilled;
          console.log(response);
          if (response?.meta?.response?.status == 200) {
            if (response?.data?.shifts) {
              dispatch(setMyShiftsPagination(response?.data?.pagination));
              if (skip > 0) {
                dispatch(addMyShiftsList(response?.data?.shifts));
              } else {
                dispatch(setMyShiftsList(response?.data?.shifts));
              }
            }
          }
        } catch (error: any) {
          dispatch(setMyShiftsList([]));
          handleApiError(error);
        }
      },
    }),
    getShiftsDetail: build.query<any, any>({
      query: (payload: any) => {
        return {
          url: `staff-shift-details/${payload}`,
          method: 'GET',
        };
      },
      providesTags: ['getMyShifts'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
          if (response?.meta?.response?.status == 200) {
            dispatch(shiftsDetail(response?.data));
          }
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    getTasksList: build.query<any, any>({
      query: ({params}: any) => {
        return {
          url: 'task',
          method: 'GET',
          params,
        };
      },
      providesTags: ['getTasksList'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {skip} = arg?.params;
          const response: any = await queryFulfilled;
          if (response?.meta?.response?.status == 200) {
            dispatch(taskList(response?.data?.tasks));
          }
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),

    updateTaskStatus: build.mutation<any, any>({
      query: ({payload, id}: any) => {
        return {
          url: 'task/' + id,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['getTasksList'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {skip} = arg?.params;
          const response: any = await queryFulfilled;
          if (response?.meta?.response?.status == 200) {
            console.log('task updated successfully');
          }
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),

    getShiftRequests: build.query<any, any>({
      query: ({params}: any) => {
        return {
          url: `shift-request`,
          method: 'GET',
          params,
        };
      },
      providesTags: ['getMyShiftRequests'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {skip} = arg?.params;
          const response: any = await queryFulfilled;
          if (response?.meta?.response?.status == 200) {
            if (response?.data?.shift_request) {
              dispatch(
                setMyShiftsRequestsPagination(response?.data?.pagination),
              );
              if (skip > 0) {
                dispatch(
                  addMyShiftsRequestsList(response?.data?.shift_request),
                );
              } else {
                dispatch(
                  setMyShiftsRequestsList(response?.data?.shift_request),
                );
              }
            }
          }
        } catch (error: any) {
          dispatch(setMyShiftsRequestsList([]));
          handleApiError(error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetMyShiftsListQuery,
  useLazyGetShiftsDetailQuery,
  useLazyGetShiftRequestsQuery,
  useLazyGetTasksListQuery,
  useUpdateTaskStatusMutation,
} = userApi;
