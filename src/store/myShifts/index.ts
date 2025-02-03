import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type SHIFTS = {
  myShiftsList: any[];
  myShiftsPagination: {skip: number; limit: number; total: number};
  myShiftsRequestsList: any[];
  myShiftsRequestsPagination: {skip: number; limit: number; total: number};
  shifts_detail: any;
  task_list?: any;
  show_members?: any;
};

const initialState: SHIFTS = {
  myShiftsList: [],
  myShiftsPagination: {skip: 0, limit: 0, total: 0},
  shifts_detail: null,
  task_list: [],
  myShiftsRequestsList: [],
  myShiftsRequestsPagination: {skip: 0, limit: 0, total: 0},
  show_members: null,
};

const slice = createSlice({
  name: 'myShifts',
  initialState,
  reducers: {
    setMyShiftsList: (state: SHIFTS, action: PayloadAction<any>) => {
      state.myShiftsList = action.payload;
    },
    addMyShiftsList: (state: SHIFTS, action: PayloadAction<any>) => {
      state.myShiftsList = [...state.myShiftsList, ...action.payload];
    },
    setMyShiftsPagination: (state: SHIFTS, action: PayloadAction<any>) => {
      state.myShiftsPagination = action.payload;
    },
    shiftsDetail: (state: SHIFTS, action: PayloadAction<any>) => {
      state.shifts_detail = action.payload;
    },
    taskList: (state: SHIFTS, action: PayloadAction<any>) => {
      state.task_list = action.payload;
    },
    setMyShiftsRequestsList: (state: SHIFTS, action: PayloadAction<any>) => {
      state.myShiftsRequestsList = action.payload;
    },
    addMyShiftsRequestsList: (state: SHIFTS, action: PayloadAction<any>) => {
      state.myShiftsRequestsList = [
        ...state.myShiftsRequestsList,
        ...action.payload,
      ];
    },
    setMyShiftsRequestsPagination: (
      state: SHIFTS,
      action: PayloadAction<any>,
    ) => {
      state.myShiftsRequestsPagination = action.payload;
    },
    setShowMembers: (state: SHIFTS, action: PayloadAction<any>) => {
      state.show_members = action.payload;
    },
  },
});

export const {
  addMyShiftsList,
  setMyShiftsList,
  setMyShiftsPagination,
  shiftsDetail,
  addMyShiftsRequestsList,
  setMyShiftsRequestsList,
  setMyShiftsRequestsPagination,
  taskList,
  setShowMembers,
} = slice.actions;

export default slice.reducer;
