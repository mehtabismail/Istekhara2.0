import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type EVENT_SETTING = {
  venuesList: any[];
  venuesListPagination: {skip: number; limit: number; total: number};
  clientsList: any[];
  clientsListPagination: {skip: number; limit: number; total: number};
  calendarEventList: any[];
  markedCalendarDates: any;
  eventShifts: any[];
};

const initialState: EVENT_SETTING = {
  venuesList: [],
  venuesListPagination: {skip: 0, limit: 0, total: 0},
  clientsList: [],
  clientsListPagination: {skip: 0, limit: 0, total: 0},
  calendarEventList: [],
  markedCalendarDates: {},
  eventShifts: [],
};

const slice = createSlice({
  name: 'eventSetting',
  initialState,
  reducers: {
    setVenuesList: (state: EVENT_SETTING, action: PayloadAction<any>) => {
      state.venuesList = action.payload;
    },
    addVenuesList: (state: EVENT_SETTING, action: PayloadAction<any>) => {
      state.venuesList = [...state.venuesList, ...action.payload];
    },
    setVenuesListPagination: (
      state: EVENT_SETTING,
      action: PayloadAction<any>,
    ) => {
      state.venuesListPagination = action.payload;
    },
    setNewVenue: (state: EVENT_SETTING, action: PayloadAction<any>) => {
      state.venuesList = [action.payload, ...state.venuesList];
    },
    updateVenue: (state: EVENT_SETTING, action: PayloadAction<any>) => {
      state.venuesList = state.venuesList?.map(item => {
        if (item._id == action?.payload?._id) {
          return action.payload;
        }
        return item;
      });
    },
    deleteVenue: (state: EVENT_SETTING, action: PayloadAction<any>) => {
      state.venuesList = state.venuesList?.filter(
        item => item?._id !== action.payload,
      );
    },

    setCleintsList: (state: EVENT_SETTING, action: PayloadAction<any>) => {
      state.clientsList = action.payload;
    },
    addCleintsList: (state: EVENT_SETTING, action: PayloadAction<any>) => {
      state.clientsList = [...state.clientsList, ...action.payload];
    },
    setCleintsListPagination: (
      state: EVENT_SETTING,
      action: PayloadAction<any>,
    ) => {
      state.clientsListPagination = action.payload;
    },
    setNewClient: (state: EVENT_SETTING, action: PayloadAction<any>) => {
      state.clientsList = [action.payload, ...state.clientsList];
    },
    updateClient: (state: EVENT_SETTING, action: PayloadAction<any>) => {
      state.clientsList = state.clientsList?.map(item => {
        if (item._id == action?.payload?._id) {
          return action.payload;
        }
        return item;
      });
    },
    deleteClient: (state: EVENT_SETTING, action: PayloadAction<any>) => {
      state.clientsList = state.clientsList?.filter(
        item => item?._id !== action.payload,
      );
    },

    setCalendarEventList: (
      state: EVENT_SETTING,
      action: PayloadAction<any>,
    ) => {
      state.calendarEventList = action.payload;
    },
    addCalendarEventList: (
      state: EVENT_SETTING,
      action: PayloadAction<any>,
    ) => {
      state.calendarEventList = [...state.calendarEventList, ...action.payload];
    },
    setMarkedCalendarDates: (
      state: EVENT_SETTING,
      action: PayloadAction<any>,
    ) => {
      state.markedCalendarDates = action.payload;
    },
    setEventShifts: (state: EVENT_SETTING, action: PayloadAction<any>) => {
      state.eventShifts = action.payload;
    },
  },
});

export const {
  setVenuesList,
  addVenuesList,
  setVenuesListPagination,
  setNewVenue,
  updateVenue,
  deleteVenue,

  setNewClient,
  updateClient,
  deleteClient,
  setCleintsList,
  addCleintsList,
  setCleintsListPagination,

  setEventShifts,
  setCalendarEventList,
  addCalendarEventList,
  setMarkedCalendarDates,
} = slice.actions;

export default slice.reducer;
