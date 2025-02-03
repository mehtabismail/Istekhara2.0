import {handleApiError} from '@/utils/functions';
import {api} from '../../api';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    verifyPin: build.mutation<any, any>({
      query: ({payload}) => {
        return {
          url: `verify-pin-code`,
          method: 'POST',
          body: payload,
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response = await queryFulfilled;
          console.log(response);
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    forgotPin: build.mutation<any, any>({
      query: ({payload}) => {
        return {
          url: `user-forget-pincode`,
          method: 'POST',
          body: payload,
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response = await queryFulfilled;
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {useVerifyPinMutation, useForgotPinMutation} = userApi;
