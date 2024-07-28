import { createSlice } from '@reduxjs/toolkit';

type Payload = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
};

export type StatePayload = {
  [key: string]: Payload;
};
type StateLength = {
  length: number;
};
export type State = StatePayload & StateLength;
const initialState = {} as State;

let peoplesLenght = 0;

const slice = createSlice({
  name: 'peoples',
  initialState,
  reducers: {
    peopleAdded: (states: State, action: { payload: Payload }) => {
      states[action.payload.name] = action.payload;
      states.length = ++peoplesLenght;
    },
    peopleRemoved: (states, action) => {
      delete states[action.payload.name];
      states.length = --peoplesLenght;
    },
    allPeopleRemoved: (states) => {
      for (const people in states) {
        delete states[people];
      }
      peoplesLenght = 0;
    },
  },
});

export const { peopleAdded, peopleRemoved, allPeopleRemoved } = slice.actions;
export default slice.reducer;
