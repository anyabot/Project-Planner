import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Task } from "@/interfaces/task";

export interface Tasks {
  [key: string]: Task;
}
const initialState: Tasks = {
  "task_1": {
    name: "UI fixing",
    parent: "sample_group_1",
    description: "Add styling",
    subtasks: [
      ["color", true],
      ["font", false],
    ],
    tags: ["sample_tag_1"],
  },
  "task_2": {
    name: "QA Testing",
    parent: "sample_group_2",
    description: "Figuring out what to do with React",
    subtasks: [],
    tags: ["sample_tag_2"],
  },
  "task_3": {
    name: "Basic Design",
    parent: "sample_group_3",
    description: "Build A working website",
    subtasks: [
      ["header", true],
      ["groups", true],
      ["drag and drop", true]
    ],
    tags: ["sample_tag_2", "sample_tag_3"],
  },
  "uneeded_1": {
    name: "Unneeded 1",
    parent: "unneeded_group",
    description: "",
    subtasks: [],
    tags: [],
  },
  "uneeded_2": {
    name: "Unneeded 2",
    parent: "unneeded_group",
    description: "",
    subtasks: [],
    tags: [],
  },
  "uneeded_3": {
    name: "Unneeded 3",
    parent: "unneeded_group",
    description: "",
    subtasks: [],
    tags: [],
  },
  "uneeded_4": {
    name: "Unneeded 4",
    parent: "unneeded_group",
    description: "",
    subtasks: [],
    tags: [],
  },
  "uneeded_5": {
    name: "Unneeded 5",
    parent: "unneeded_group",
    description: "",
    subtasks: [],
    tags: [],
  },
  "uneeded_6": {
    name: "Unneeded 6",
    parent: "unneeded_group",
    description: "",
    subtasks: [],
    tags: [],
  },
  "uneeded_7": {
    name: "Unneeded 7",
    parent: "unneeded_group",
    description: "",
    subtasks: [],
    tags: [],
  },
  "uneeded_8": {
    name: "Unneeded 8",
    parent: "unneeded_group",
    description: "",
    subtasks: [],
    tags: [],
  },
  "uneeded_9": {
    name: "Unneeded 9",
    parent: "unneeded_group",
    description: "",
    subtasks: [],
    tags: [],
  },
  "uneeded_10": {
    name: "Unneeded 10",
    parent: "unneeded_group",
    description: "",
    subtasks: [],
    tags: [],
  },
  "markdown": {
    name: "With Markdown",
    parent: "sample_group_3",
    description: "# h1 Heading\n## h2 Heading\n### h3 Heading\n#### h4 Heading\n##### h5 Heading\n###### h6 Heading\n\n\n## Horizontal Rules\n\n___\n\n***\n\n***\n\n\n## Typographic replacements\n\nEnable typographer option to see result.\n\n(c) (C) (r) (R) (tm) (TM) (p) (P) +-\n\ntest.. test... test..... test?..... test!....\n\n!!!!!! ???? ,,\n\nRemarkable -- awesome\n\n\"Smartypants, double quotes\"\n\n'Smartypants, single quotes'\n\n\n## Emphasis\n\n**This is bold text**\n\n__This is bold text__\n\n*This is italic text*\n\n_This is italic text_\n\n~~Deleted text~~\n\nSuperscript: 19^th^\n\nSubscript: H~2~O\n\n++Inserted text++\n\n==Marked text==\n\n\n## Blockquotes\n\n> Blockquotes can also be nested...\n>> ...by using additional greater-than signs right next to each other...\n> > > ...or with spaces between arrows.\n\n\n## Lists\n\nUnordered\n\n+ Create a list by starting a line with `+`, `-`, or `*`\n+ Sub-lists are made by indenting 2 spaces:\n  - Marker character change forces new list start:\n    * Ac tristique libero volutpat at\n    + Facilisis in pretium nisl aliquet\n    - Nulla volutpat aliquam velit\n+ Very easy!\n\nOrdered\n\n1. Lorem ipsum dolor sit amet\n2. Consectetur adipiscing elit\n3. Integer molestie lorem at massa\n\n\n1. You can use sequential numbers...\n1. ...or keep all the numbers as `1.`\n\nStart numbering with offset:\n\n57. foo\n1. bar\n\n\n## Code\n\nInline `code`\n\nIndented code\n\n    // Some comments\n    line 1 of code\n    line 2 of code\n    line 3 of code\n\n\nBlock code \"fences\"\n\n```\nSample text here...\n```\n\nSyntax highlighting\n\n``` js\nvar foo = function (bar) {\n  return bar++;\n};\n\nconsole.log(foo(5));\n```\n\n## Tables\n\n| Option | Description |\n| ------ | ----------- |\n| data   | path to data files to supply the data that will be passed into templates. |\n| engine | engine to be used for processing templates. Handlebars is the default. |\n| ext    | extension to be used for dest files. |\n\nRight aligned columns\n\n| Option | Description |\n| ------:| -----------:|\n| data   | path to data files to supply the data that will be passed into templates. |\n| engine | engine to be used for processing templates. Handlebars is the default. |\n| ext    | extension to be used for dest files. |\n\n\n## Links\n\n[link text](http://dev.nodeca.com)\n\n[link with title](http://nodeca.github.io/pica/demo/ \"title text!\")\n\nAutoconverted link https://github.com/nodeca/pica (enable linkify to see)\n\n\n## Images\n\n![Minion](https://octodex.github.com/images/minion.png)\n![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg \"The Stormtroopocat\")\n\nLike links, Images also have a footnote style syntax\n\n![Alt text][id]\n\nWith a reference later in the document defining the URL location:\n\n[id]: https://octodex.github.com/images/dojocat.jpg  \"The Dojocat\"\n\n\n## Footnotes\n\nFootnote 1 link[^first].\n\nFootnote 2 link[^second].\n\nInline footnote^[Text of inline footnote] definition.\n\nDuplicated footnote reference[^second].\n\n[^first]: Footnote **can have markup**\n\n    and multiple paragraphs.\n\n[^second]: Footnote text.\n\n\n## Definition lists\n\nTerm 1\n\n:   Definition 1\nwith lazy continuation.\n\nTerm 2 with *inline markup*\n\n:   Definition 2\n\n        { some code, part of Definition 2 }\n\n    Third paragraph of definition 2.\n\n_Compact style:_\n\nTerm 1\n  ~ Definition 1\n\nTerm 2\n  ~ Definition 2a\n  ~ Definition 2b\n\n\n## Abbreviations\n\nThis is HTML abbreviation example.\n\nIt converts \"HTML\", but keep intact partial entries like \"xxxHTMLyyy\" and so on.",
    subtasks: [],
    tags: [],
  }
};

export const EnemySlice = createSlice({
  name: "state",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTask: (state, action: PayloadAction<[string, Task]>) => {
      action.payload[0] in state ? state[action.payload[0]] = action.payload[1] : null
    },
    addTask: (state, action: PayloadAction<[string, string, string]>) => {
      state[action.payload[1]] = {
          name: action.payload[2],
          parent: action.payload[0],
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
      },
      deleteTagFromTask: (      state,
        action: PayloadAction<[string, string]>) => {
          if (action.payload[0] in state) {
          const temp = state[action.payload[0]].tags
          var index = temp.indexOf(action.payload[1]);
  
          if (index === -1) {
            return
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
  toogleTag,
  deleteTagFromTask
} = EnemySlice.actions;
export const selectTasks = (state: RootState) => state.tasks;

export default EnemySlice.reducer;
