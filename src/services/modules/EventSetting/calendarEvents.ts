import {getApiFormattedDate, handleApiError} from '@/utils/functions';
import {api} from '../../api';
import {
  setCalendarEventList,
  setEventShifts,
  setMarkedCalendarDates,
} from '@/store/eventSetting';
import {Colors} from '@/theme/Variables';

const customStyles = {
  container: {
    backgroundColor: Colors.gray_9D9D9D,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
  },
};

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    getCalenderEventsList: build.query<any, any>({
      query: ({}) => {
        return {
          url: `event`,
          method: 'GET',
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
          if (response?.data?.events) {
            dispatch(setCalendarEventList(response?.data?.events));
            const obj: any = {};
            response?.data?.events.forEach((event: any) => {
              event.time_slots.forEach((slot: any) => {
                const dateKey = getApiFormattedDate(slot.date); // Extract 'YYYY-MM-DD' from date
                obj[dateKey] = {customStyles};
              });
            });
            dispatch(setMarkedCalendarDates(obj));
          }
        } catch (error: any) {
          dispatch(setCalendarEventList([]));
          handleApiError(error);
        }
      },
    }),
    getEventShifts: build.query<any, any>({
      query: ({date = '', search = '', order = false, sort = ''}) => {
        return {
          url: `event-shift?date=${date}&search=${search}&sort=${sort}&order=${
            order ? 1 : -1
          }`,
          method: 'GET',
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const response: any = await queryFulfilled;
          if (response?.data?.events) {
            dispatch(setEventShifts(response?.data?.events));
          }
        } catch (error: any) {
          dispatch(setEventShifts([]));
          handleApiError(error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {useLazyGetCalenderEventsListQuery, useLazyGetEventShiftsQuery} =
  userApi;
