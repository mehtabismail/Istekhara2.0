import {handleApiError} from '@/utils/functions';
import {api} from '../../api';
import {setClients, setUsers, setVenues} from '@/store/common';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    getClients: build.query<any, any>({
      query: ({}) => {
        return {
          url: `client`,
          method: 'GET',
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
          if (response?.data?.clients) {
            dispatch(setClients(response?.data?.clients));
          }
        } catch (error: any) {
          dispatch(setClients([]));
          handleApiError(error);
        }
      },
    }),
    getVenues: build.query<any, any>({
      query: ({}) => {
        return {
          url: `venue`,
          method: 'GET',
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
          if (response?.data?.venues) {
            dispatch(setVenues(response?.data?.venues));
          }
        } catch (error: any) {
          dispatch(setVenues([]));
          handleApiError(error);
        }
      },
    }),
    getUsers: build.query<any, any>({
      query: ({}) => {
        let params = {limit: 100000000};
        return {
          url: `user`,
          method: 'GET',
          params,
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
          if (response?.data?.users) {
            dispatch(setUsers(response?.data?.users));
          }
        } catch (error: any) {
          dispatch(setVenues([]));
          handleApiError(error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetClientsQuery,
  useLazyGetVenuesQuery,
  useLazyGetUsersQuery,
} = userApi;
