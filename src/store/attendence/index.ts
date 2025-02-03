import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type ATTENDENCE = {
  attendenceList: any[];
  attendencePagination: {skip: number; limit: number; total: number};
};

const initialState: ATTENDENCE = {
  attendenceList: [],
  attendencePagination: {skip: 0, limit: 0, total: 0},
};

const slice = createSlice({
  name: 'attendence',
  initialState,
  reducers: {
    setAttendenceList: (state: ATTENDENCE, action: PayloadAction<any>) => {
      state.attendenceList = action.payload;
    },
    addAttendenceList: (state: ATTENDENCE, action: PayloadAction<any>) => {
      state.attendenceList = [...state.attendenceList, ...action.payload];
    },
    setAttendencePagination: (
      state: ATTENDENCE,
      action: PayloadAction<any>,
    ) => {
      state.attendencePagination = action.payload;
    },
  },
});

export const {addAttendenceList, setAttendenceList, setAttendencePagination} =
  slice.actions;

export default slice.reducer;
