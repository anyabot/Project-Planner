import taskSlice, {
  selectTasks,
  removeTask,
  addTask,
  deleteTagFromTask,
} from "./store/taskSlice";
import {
  selectGroups,
  addTaskToGroup,
  removeTaskFromGroup,
  removeGroup,
  addGroup,
} from "./store/groupSlice";
import {
  selectBoards,
  selectActiveBoard,
  removeGroupFromBoard,
  removeBoard,
  addGroupToBoardAt,
  addTag,
  removeTag,
  addBoard,
} from "./store/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { addBoardToProject, addProject, selectProjects, removeProject } from "./store/projectSlice";

const useQuickModify = () => {
  const dispatch = useDispatch();
  const groups = useSelector(selectGroups);
  const boards = useSelector(selectBoards);
  const projects = useSelector(selectProjects);
  const tasks = useSelector(selectTasks);
  const activeBoard = useSelector(selectActiveBoard);
  function newTask(group: string, name: string) {
    let taskId = "task_" + getDate();
    dispatch(addTask([group, taskId, name]));
    dispatch(addTaskToGroup([group, taskId]));
  }
  function deleteTask(group:string, task: string) {
    dispatch(removeTask(task));
    dispatch(removeTaskFromGroup([group, task]))
  }
  function newGroupAt(board: string, ind: number, name: string, color: string) {
    let groupId = "group_" + getDate();
    dispatch(addGroupToBoardAt([board, groupId, ind]));
    dispatch(addGroup([board, groupId, name, color]));
  }
  function deleteGroup(board: string, group: string) {
    if (group in groups) {
      groups[group].tasks.forEach((task) => {
        deleteTask(group, task);
      });
      dispatch(removeGroup(group));
      dispatch(removeGroupFromBoard([board, group]))
    }
  }
  function newBoard(project: string, name: string) {
    let boardId = "board_" + getDate();
    dispatch(addBoardToProject([project, boardId]));
    dispatch(addBoard([boardId, name, project]));
    return boardId;
  }
  function deleteBoard(board: string) {
    if (board in boards) {
      boards[board].groups.forEach((group) => {
        deleteTask(board, group);
      });
      dispatch(removeBoard(board));
    }
  }
  function newProject(name: string) {
    let projectId = "project_" + getDate();
    dispatch(addProject([projectId, name]));
    return projectId;
  }
  function deleteProject(project: string) {
    if (project in projects) {
      projects[project].boards.forEach((board) => {
        deleteTask(project, board);
      });
      dispatch(removeProject(project));
    }
  }
  function newTag(board: string, tag: string, color: string) {
    let tagId = "tag_" + getDate();
    dispatch(addTag([board, tagId, tag, color]));
  }
  function deleteTag(tag: string) {

    if (!activeBoard) return;
    let board = boards[activeBoard];
    dispatch(removeTag([activeBoard, tag]));
    board.groups.forEach((group) => {
      groups[group].tasks.forEach((task) => {
        dispatch(deleteTagFromTask([task, tag]));
      });
    });
  }
  const actions = useMemo(
    () => ({
      deleteTask,
      deleteGroup,
      deleteBoard,
      newTask,
      newGroupAt,
      newTag,
      deleteTag,
      newBoard,
      newProject,
      deleteProject
    }),
    [dispatch]
  );

  return actions;
};

function getDate() {
  return new Date().getTime();
}

export { getDate, useQuickModify };
