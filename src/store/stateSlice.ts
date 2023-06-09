import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../interfaces/task"

export interface State {
  modal: string | null;
  current_user: string | null;
  user_list: {[key: string]: User};
}

const initialState: State = {
  modal: null,
  current_user: "admin",
  user_list: {
    "admin": {
      name: "Alterisk",
      email: "lttcyber@gmail.com",
      avatar: "https://m.media-amazon.com/images/I/71lPynGPQ6L._AC_UX569_.jpg"
    },
    "user_1": {
      name: "Eldora de Mofus",
      email: "elelelelel@gmail.com",
      avatar: ""
    },
    "user_2": {
      name: "Deus ex Machina",
      email: "Dem_god@gmail.com",
      avatar: ""
    },
    "user_3": {
      name: "Zance Blackrat",
      email: "the_only_black_rat@gmail.com",
      avatar: ""
    }
  }
};

export const StateSlice = createSlice({
  name: "state",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setModal: (state, action: PayloadAction<string>) => {
      state.modal = action.payload;
    },
    closeModal: (state) => {
      state.modal = null;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
});

export const {
  setModal,
  closeModal,
} = StateSlice.actions;
export const selectModal = (state: RootState) => state.state.modal;
export const selectUsers = (state: RootState) => state.state.user_list;
export const selectCurrentUser = (state: RootState) => state.state.current_user;

export default StateSlice.reducer;
