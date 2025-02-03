import {handleApiError} from '@/utils/functions';
import {api} from '../../api';
import {
  addAttendenceList,
  setAttendenceList,
  setAttendencePagination,
} from '@/store/attendence';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    getAttendenceList: build.query<any, any>({
      query: ({params}: any) => {
        return {
          url: 'availability',
          method: 'GET',
          params,
        };
      },
      providesTags: ['getAttendenceList'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {skip} = arg?.params;
          const response: any = await queryFulfilled;
          console.log('response', response);
          if (response?.meta?.response?.status == 200) {
            if (response?.data?.availability) {
              dispatch(setAttendencePagination(response?.data?.pagination));
              if (skip > 0) {
                dispatch(addAttendenceList(response?.data?.availability));
              } else {
                dispatch(setAttendenceList(response?.data?.availability));
              }
            }
          }
        } catch (error: any) {
          dispatch(setAttendenceList([]));
          handleApiError(error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {useLazyGetAttendenceListQuery} = userApi;
