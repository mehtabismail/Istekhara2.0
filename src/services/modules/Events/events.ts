import {handleApiError} from '@/utils/functions';
import {api} from '../../api';
import {
  addEventsList,
  deleteEvent,
  setEventsList,
  setEventsPagination,
  setSelectedEvent,
} from '@/store/events';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    getEventsList: build.query<any, any>({
      query: ({params}) => {
        return {
          url: `event`,
          method: 'GET',
          params,
        };
      },
      providesTags: ['getEvents'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {skip} = arg?.params;
          const response: any = await queryFulfilled;
          if (response?.data?.events) {
            dispatch(setEventsPagination(response?.data?.pagination));
            if (skip > 0) {
              dispatch(addEventsList(response?.data?.events));
            } else {
              dispatch(setEventsList(response?.data?.events));
            }
          }
        } catch (error: any) {
          dispatch(setEventsList([]));
          handleApiError(error);
        }
      },
    }),
    createEvent: build.mutation<any, any>({
      query: ({payload}) => {
        return {
          url: `event`,
          method: 'POST',
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
    updateEvent: build.mutation<any, any>({
      query: ({payload, _id}) => {
        return {
          url: `event/${_id}`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['getEvents', 'getSelectedEvent'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    deleteEvent: build.mutation<any, any>({
      query: ({_id}) => {
        return {
          url: `event/${_id}`,
          method: 'DELETE',
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {_id} = arg;
          const response: any = await queryFulfilled;
          if (response?.data?.message) {
            dispatch(deleteEvent(_id));
          }
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    getSelectedEvent: build.query<any, any>({
      query: ({_id}) => {
        return {
          url: `event/${_id}`,
          method: 'GET',
        };
      },
      providesTags: ['getSelectedEvent'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
          if (response?.data?.event) {
            dispatch(setSelectedEvent(response.data));
          }
        } catch (error: any) {
          dispatch(setSelectedEvent({}));
          handleApiError(error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetEventsListQuery,
  useCreateEventMutation,
  useLazyGetSelectedEventQuery,
  useDeleteEventMutation,
  useUpdateEventMutation,
} = userApi;
