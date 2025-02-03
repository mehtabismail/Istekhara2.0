import {handleApiError} from '@/utils/functions';
import {api} from '../../api';
import {toast} from '@/utils/toast';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    sendEmail: build.mutation<any, any>({
      query: ({payload}) => {
        return {
          url: `auth/user-forget-password`,
          method: 'POST',
          body: payload,
        };
      },
      async onQueryStarted(arg, {queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
          toast.success('Email sent, check your inbox');
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    sendOtp: build.mutation<any, any>({
      query: ({payload}) => {
        return {
          url: `auth/user-otp`,
          method: 'POST',
          body: payload,
        };
      },
      async onQueryStarted(arg, {queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    sendNewPassword: build.mutation<any, any>({
      query: ({payload, code}) => {
        return {
          url: `auth/reset-password/${code}`,
          method: 'POST',
          body: payload,
        };
      },
      async onQueryStarted(arg, {queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
          if (response?.data?.message) {
            toast.success(response?.data?.message);
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
  useSendEmailMutation,
  useSendOtpMutation,
  useSendNewPasswordMutation,
} = userApi;
