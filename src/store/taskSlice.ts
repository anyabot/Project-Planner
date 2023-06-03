import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Task } from "@/interfaces/task";

export interface Tasks {
  [key: string]: Task;
}
const initialState: Tasks = {
  "task_1": {
    name: "UI fixing",
    description: "Add styling",
    subtasks: [
      ["color", true],
      ["font", false],
    ],
    tags: ["sample_tag_1"],
  },
  "task_2": {
    name: "QA Testing",
    description: "Figuring out what to do with React",
    subtasks: [],
    tags: ["sample_tag_2"],
  },
  "task_3": {
    name: "Basic Design",
    description: "Build A working website",
    subtasks: [
      ["header", true],
      ["groups", true],
      ["drag and drop", true]
    ],
    tags: ["sample_tag_2", "sample_tag_3"],
  },
};

export const EnemySlice = createSlice({
  name: "state",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTask: (state, action: PayloadAction<[string, Task]>) => {
      action.payload[0] in state ? state[action.payload[0]] = action.payload[1] : null
    },
    addTask: (state, action: PayloadAction<[string, string]>) => {
      state[action.payload[0]] = {
          name: action.payload[1],
          description: "",
          subtasks: [],
          tags: [],
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      delete state[action.payload]
    },
    updateTaskName: (
      state,
      action: PayloadAction<[string, string]>
    ) => {
      action.payload[0] in state ? state[action.payload[0]].name =action.payload[1] : null
    },
    updateTaskDescription: (
      state,
      action: PayloadAction<[string, string]>
    ) => {
      action.payload[0] in state ? state[action.payload[0]].description =action.payload[1] : null
    },
    flipSubtask: (state, action: PayloadAction<[string, number]>) => {
      action.payload[0] in state ? state[action.payload[0]].subtasks[action.payload[1]][1] = !state[action.payload[0]].subtasks[action.payload[1]][1] : null
    },
    removeSubtask: (state, action: PayloadAction<[string, number]>) => {
      action.payload[0] in state ? state[action.payload[0]].subtasks.splice(
        action.payload[1]
      ) : null
    },
    addSubTask: (state, action: PayloadAction<[string, string]>) => {
      action.payload[0] in state ? state[action.payload[0]].subtasks.push([
        action.payload[1],
        false,
      ]) : null
    },
    editSubtask: (
      state,
      action: PayloadAction<[string, number, string]>
    ) => {
      action.payload[0] in state ? state[action.payload[0]].subtasks[
        action.payload[1]
      ][0] = action.payload[2] : null
    },
    toogleTag: (      state,
      action: PayloadAction<[string, string]>) => {
        if (action.payload[0] in state) {
        const temp = state[action.payload[0]].tags
        var index = temp.indexOf(action.payload[1]);

        if (index === -1) {
          temp.push(action.payload[1]);
        } else {
          temp.splice(index, 1);
        }
        state[action.payload[0]].tags = temp
      }
      }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
});

export const {
  setTask, addTask, removeTask,
  updateTaskName,
  updateTaskDescription,
  flipSubtask,
  removeSubtask,
  addSubTask,
  editSubtask,
  toogleTag
} = EnemySlice.actions;
export const selectTasks = (state: RootState) => state.tasks;

export default EnemySlice.reducer;
