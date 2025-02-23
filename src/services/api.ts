import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_URL,

  prepareHeaders: (headers, {getState}) => {
    const state: any = getState();
    const {token} = state.auth;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  console.log(`🔥 | API==>`, args);
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  tagTypes: [
    'getEvents',
    'getSelectedEvent',
    'getEventShifts',
    'getTeamsList',
    'getSingleTeam',
    'getTaskList',
    'getMyShifts',
    'getMyShiftRequests',
    'getAttendenceList',
    'getTasksList',
  ],
});
