import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getDate } from "@/utils";

export interface Projects {
  active: string | null;
  projects: {
    [key: string]: {
      name: string;
      boards: string[];
    };
  };
}

const initialState: Projects = {
  active: null,
  projects: {
    "sample": { name: "Sample Project", boards: ["board_1", "empty_board_1"] },
    "empty": { name: "Empty Project", boards: ["empty_board_2"] },
  },
};

export const ProjectSlice = createSlice({
  name: "projects",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setActiveProject: (state, action: PayloadAction<string | null>) => {
      state.active = action.payload;
    },
    addProject: (state) => {
      let temp = "project_" + getDate()
      state.projects[temp] = { name: "New Project", boards: [""] }
      state.active = temp
    },
    renameProject: (state, action: PayloadAction<[string, string]>) => {
      action.payload[0] in state.projects ? state.projects[action.payload[0]].name = action.payload[1] : null
    },
    addBoardToProject: (state, action: PayloadAction<[string, string]>) => {
      action.payload[0] in state.projects ? null : state.projects[action.payload[0]].boards.push(action.payload[1])
    },
    removeBoardFromProject: (state, action: PayloadAction<[string, string]>) => {
      if (action.payload[0] in state.projects) {
        let temp = state.projects[action.payload[0]].boards
        let ind = temp.indexOf(action.payload[1])
        temp.splice(ind)
      }
      
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
});

export const {
  setActiveProject,
  addProject,
  addBoardToProject,
  removeBoardFromProject,
} = ProjectSlice.actions;
export const selectProjects = (state: RootState) => state.projects.projects;
export const selectActiveProject = (state: RootState) => state.projects.active;

export default ProjectSlice.reducer;
