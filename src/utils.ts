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
  addGroupToBoard,
  addGroupToBoardAt,
  addTag,
  removeTag,
  addBoard,
} from "./store/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { StringMappingType } from "typescript";
import { addBoardToProject } from "./store/projectSlice";

const useQuickModify = () => {
  const dispatch = useDispatch();
  const groups = useSelector(selectGroups);
  const boards = useSelector(selectBoards);
  const tasks = useSelector(selectTasks);
  const activeBoard = useSelector(selectActiveBoard);
  function newTask(group: string, name: string) {
    let taskId = "task_" + getDate();
    dispatch(addTask([taskId, name]));
    dispatch(addTaskToGroup([group, taskId]));
  }
  function deleteTask(task: string) {
    dispatch(removeTask(task));
  }
  function newGroupAt(board: string, ind: number, name: string, color: string) {
    let groupId = "group_" + getDate();
    dispatch(addGroupToBoardAt([board, groupId, ind]));
    dispatch(addGroup([groupId, name, color]));
  }
  function deleteGroup(group: string) {
    if (group in groups) {
      groups[group].tasks.forEach((task) => {
        deleteTask(task);
      });
      dispatch(removeGroup(group));
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
        deleteTask(group);
      });
      dispatch(removeBoard(board));
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
      newBoard
    }),
    [dispatch]
  );

  return actions;
};

function getDate() {
  return new Date().getTime();
}

export { getDate, useQuickModify };
