import {handleApiError} from '@/utils/functions';
import {api} from '../../api';
import {
  addVenuesList,
  deleteVenue,
  setNewVenue,
  setVenuesList,
  setVenuesListPagination,
  updateVenue,
} from '@/store/eventSetting';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    createVenue: build.mutation<any, any>({
      query: ({payload}) => {
        return {
          url: `venue`,
          method: 'POST',
          body: payload,
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
          if (response?.data?.venue) {
            dispatch(setNewVenue(response?.data?.venue));
          }
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    updateVenue: build.mutation<any, any>({
      query: ({payload, _id}) => {
        return {
          url: `venue/${_id}`,
          method: 'PUT',
          body: payload,
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
          if (response?.data?.item) {
            dispatch(updateVenue(response?.data?.item));
          }
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    deleteVenue: build.mutation<any, any>({
      query: ({_id}) => {
        return {
          url: `venue/${_id}`,
          method: 'DELETE',
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {_id} = arg;
          const response: any = await queryFulfilled;
          if (response?.data?.message) {
            dispatch(deleteVenue(_id));
          }
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    getVenuesList: build.query<any, any>({
      query: ({search = '', skip = '', limit = '', order, sort = ''}) => {
        return {
          url: `venue?search=${search}&skip=${skip}&limit=${limit}&sort=${sort}&order=${
            order ? 1 : -1
          }`,
          method: 'GET',
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {skip} = arg;
          const response: any = await queryFulfilled;
          if (response?.data?.venues) {
            dispatch(setVenuesListPagination(response?.data?.pagination));
            if (skip) {
              dispatch(addVenuesList(response?.data?.venues));
            } else {
              dispatch(setVenuesList(response?.data?.venues));
            }
          }
        } catch (error: any) {
          dispatch(setVenuesList([]));
          handleApiError(error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateVenueMutation,
  useUpdateVenueMutation,
  useLazyGetVenuesListQuery,
  useDeleteVenueMutation,
} = userApi;
