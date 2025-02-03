import {handleApiError} from '@/utils/functions';
import {api} from '../../api';
import {
  addCleintsList,
  deleteClient,
  setCleintsList,
  setCleintsListPagination,
  setNewClient,
  updateClient,
} from '@/store/eventSetting';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    createClient: build.mutation<any, any>({
      query: ({payload}) => {
        return {
          url: `client`,
          method: 'POST',
          body: payload,
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
          if (response?.data?.client) {
            dispatch(setNewClient(response?.data?.client));
          }
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    updateClient: build.mutation<any, any>({
      query: ({payload, _id}) => {
        return {
          url: `client/${_id}`,
          method: 'PUT',
          body: payload,
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
          if (response?.data?.item) {
            dispatch(updateClient(response?.data?.item));
          }
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    deleteClient: build.mutation<any, any>({
      query: ({_id}) => {
        return {
          url: `client/${_id}`,
          method: 'DELETE',
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {_id} = arg;
          const response: any = await queryFulfilled;
          if (response?.data?.message) {
            dispatch(deleteClient(_id));
          }
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    getClientsList: build.query<any, any>({
      query: ({search = '', skip = '', limit = '', order, sort = ''}) => {
        return {
          url: `client?search=${search}&skip=${skip}&limit=${limit}&sort=${sort}&order=${
            order ? 1 : -1
          }`,
          method: 'GET',
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {skip} = arg;
          const response: any = await queryFulfilled;
          if (response?.data?.clients) {
            dispatch(setCleintsListPagination(response?.data?.pagination));
            if (skip) {
              dispatch(addCleintsList(response?.data?.clients));
            } else {
              dispatch(setCleintsList(response?.data?.clients));
            }
          }
        } catch (error: any) {
          dispatch(setCleintsList([]));
          handleApiError(error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useLazyGetClientsListQuery,
} = userApi;
