import { removeTask, addTask } from "./store/taskSlice"
import { selectGroups, addTaskToGroup, removeTaskFromGroup, removeGroup, addGroup } from "./store/groupSlice"
import { selectBoards, removeGroupFromBoard, removeBoard, addGroupToBoard, addGroupToBoardAt, addTag } from "./store/boardSlice"
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import { StringMappingType } from "typescript"

const useQuickModify = () => {
  const dispatch = useDispatch()
  const groups = useSelector(selectGroups)
  const boards = useSelector(selectBoards)

  function newTask(group:string, name:string) {
    let taskId = "task_" + getDate();
    dispatch(addTask([taskId, name]));
    dispatch(addTaskToGroup([group, taskId]));
  }
  function deleteTask(task: string) {
    dispatch(removeTask(task))
  }
  function newGroupAt(board: string, ind:number) {
    let groupId = "group_" + getDate();
    dispatch(addGroupToBoardAt([board, groupId, ind]));
    dispatch(addGroup(groupId));
  }
  function newGroup(board: string) {
    let groupId = "group_" + getDate();
    dispatch(addGroupToBoard([board, groupId]));
    dispatch(addGroup(groupId));
  }
  function deleteGroup(group: string) {
    if (group in groups) {
      groups[group].tasks.forEach(task => {
        deleteTask(task)
      });
      dispatch(removeGroup(group))
    }
  }
  function deleteBoard(board: string) {
    if (board in boards) {
      boards[board].groups.forEach(group => {
        deleteTask(group)
      });
      dispatch(removeBoard(board))
    }
  }
  function newTag(board:string, tag: string, color: string) {
    let tagId = "tag_" + getDate();
    dispatch(addTag([board, tagId, tag, color]));
  }
  const actions = useMemo(() => ({
    deleteTask, deleteGroup, deleteBoard, newTask, newGroupAt, newGroup, newTag
  }), [dispatch])

  return actions
}

function getDate() {
  return new Date().getTime()
}

export { getDate, useQuickModify }