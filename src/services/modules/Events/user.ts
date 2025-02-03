import {handleApiError} from '@/utils/functions';
import {api} from '../../api';
import {removeTeamMember} from '@/store/events';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    removeTeamMember: build.mutation<any, any>({
      query: ({team_id, user_id}) => {
        return {
          url: `remove-user/${team_id}/${user_id}`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['getTeamsList', 'getSingleTeam', 'getEventShifts'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {user_id} = arg;
          const response: any = await queryFulfilled;
          if (response?.data?.message) {
            dispatch(removeTeamMember(user_id));
          }
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    addRemoveChief: build.mutation<any, any>({
      query: ({team_id, user_id}) => {
        return {
          url: `crew-chief/${team_id}/${user_id}`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['getSingleTeam'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),

    checkIn: build.mutation<any, any>({
      query: ({payload}) => {
        return {
          url: `availability`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['getSingleTeam'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
    checkOut: build.mutation<any, any>({
      query: ({payload, _id}) => {
        return {
          url: `availability/${_id}`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['getSingleTeam'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
        } catch (error: any) {
          handleApiError(error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useRemoveTeamMemberMutation,
  useCheckInMutation,
  useCheckOutMutation,
  useAddRemoveChiefMutation,
} = userApi;
