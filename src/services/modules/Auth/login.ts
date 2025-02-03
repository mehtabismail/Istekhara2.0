import {handleApiError} from '@/utils/functions';
import {api} from '../../api';
import {setLoginData} from '@/store/auth';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<any, any>({
      query: ({payload}) => {
        return {
          url: `login`,
          method: 'POST',
          body: payload,
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
          if (response?.data?.user) {
            dispatch(setLoginData(response?.data));
          }
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {useLoginMutation} = userApi;
