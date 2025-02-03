import {handleApiError} from '@/utils/functions';
import {api} from '../../api';
import {deleteShift, setEventShifts, setSelectedShift} from '@/store/events';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    createShift: build.mutation<any, any>({
      query: ({payload}) => {
        return {
          url: `shift`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['getEvents', 'getSelectedEvent', 'getEventShifts'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    updateShift: build.mutation<any, any>({
      query: ({payload, _id}) => {
        return {
          url: `shift/${_id}`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['getEvents'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    getEventShifts: build.query<any, any>({
      query: ({params}) => {
        return {
          url: `shift`,
          method: 'GET',
          params,
        };
      },
      providesTags: ['getEventShifts'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
          if (response?.data?.shifts) {
            dispatch(setEventShifts(response?.data?.shifts));
          }
        } catch (error: any) {
          dispatch(setEventShifts([]));
          handleApiError(error);
        }
      },
    }),
    getSingleShift: build.query<any, any>({
      query: ({_id}) => {
        return {
          url: `shift/${_id}`,
          method: 'GET',
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
          if (response?.data?.shift) {
            dispatch(setSelectedShift(response?.data?.shift));
          }
        } catch (error: any) {
          dispatch(setSelectedShift({}));
          handleApiError(error);
        }
      },
    }),
    deleteShift: build.mutation<any, any>({
      query: ({_id}) => {
        return {
          url: `shift/${_id}`,
          method: 'DELETE',
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {_id} = arg;
          const response: any = await queryFulfilled;
          if (response?.data?.message) {
            dispatch(deleteShift(_id));
          }
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateShiftMutation,
  useUpdateShiftMutation,
  useLazyGetEventShiftsQuery,
  useLazyGetSingleShiftQuery,
  useDeleteShiftMutation,
} = userApi;
