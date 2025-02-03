import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type EVENTS = {
  eventsList: any[];
  eventsPagination: {skip: number; limit: number; total: number};
  selectedEvent: any;
  eventShifts: any[];
  selectedShift: any;
  teamsList: any[];
  selectedTeam: any[];
  taskList: any[];
};

const initialState: EVENTS = {
  eventsList: [],
  eventsPagination: {skip: 0, limit: 0, total: 0},
  selectedEvent: {},
  eventShifts: [],
  selectedShift: {},
  teamsList: [],
  selectedTeam: [],
  taskList: [],
};

const slice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEventsList: (state: EVENTS, action: PayloadAction<any>) => {
      state.eventsList = action.payload;
    },
    addEventsList: (state: EVENTS, action: PayloadAction<any>) => {
      state.eventsList = [...state.eventsList, ...action.payload];
    },
    setEventsPagination: (state: EVENTS, action: PayloadAction<any>) => {
      state.eventsPagination = action.payload;
    },
    deleteEvent: (state: EVENTS, action: PayloadAction<any>) => {
      state.eventsList = state.eventsList?.filter(
        item => item?._id !== action.payload,
      );
    },
    setSelectedEvent: (state: EVENTS, action: PayloadAction<any>) => {
      state.selectedEvent = action.payload;
    },
    setEventShifts: (state: EVENTS, action: PayloadAction<any>) => {
      state.eventShifts = action.payload;
    },
    deleteShift: (state: EVENTS, action: PayloadAction<any>) => {
      state.eventShifts = state.eventShifts?.filter(
        item => item?._id !== action.payload,
      );
    },
    setSelectedShift: (state: EVENTS, action: PayloadAction<any>) => {
      state.selectedShift = action.payload;
    },
    setTeamsList: (state: EVENTS, action: PayloadAction<any>) => {
      state.teamsList = action.payload;
    },
    deleteTeam: (state: EVENTS, action: PayloadAction<any>) => {
      state.teamsList = state.teamsList?.filter(
        item => item?._id !== action.payload,
      );
    },
    setSelectedTeam: (state: EVENTS, action: PayloadAction<any>) => {
      state.selectedTeam = action.payload;
    },
    removeTeamMember: (state: EVENTS, action: PayloadAction<any>) => {
      let memberArr = state.selectedTeam?.members;
      memberArr = memberArr?.filter(
        (item: any) => item?._id !== action.payload,
      );
      let teamObj = {...state?.selectedTeam, members: memberArr};
      state.selectedTeam = teamObj;
    },
    setTaskList: (state: EVENTS, action: PayloadAction<any>) => {
      state.taskList = action.payload;
    },

    deleteTask: (state: EVENTS, action: PayloadAction<any>) => {
      state.taskList = state.taskList?.filter(
        item => item?._id !== action.payload,
      );
    },
  },
});

export const {
  deleteTeam,
  deleteTask,
  deleteEvent,
  deleteShift,
  setTaskList,
  setTeamsList,
  addEventsList,
  setEventsList,
  setEventShifts,
  setSelectedTeam,
  removeTeamMember,
  setSelectedShift,
  setSelectedEvent,
  setEventsPagination,
} = slice.actions;

export default slice.reducer;
