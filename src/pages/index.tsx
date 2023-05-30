import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation,
} from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { Box, Flex, useComponentStyles__unstable } from "@chakra-ui/react";
import { TaskData, GroupData } from "@/interfaces/task";
import dynamic from "next/dynamic";
const TaskGroup = dynamic(import("@/components/tasks/taskgroup"));
import { useAppSelector, useAppDispatch } from '@/hooks';
import { selectGroups, setGroups, setTasks } from "@/store/stateSlice";
import { Scrollbar } from 'react-scrollbars-custom';
const inter = Inter({ subsets: ["latin"] });

const reorder = (list: TaskData[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (
  source: TaskData[],
  destination: TaskData[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: { [key: string]: TaskData[] } = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export default function Home() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectGroups);
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);
  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd].tasks, source.index, destination.index);
      dispatch(setTasks([sInd, items]));
    } else {
      const result = move(
        state[sInd].tasks,
        state[dInd].tasks,
        source,
        destination
      );
      const newState = state.map((item, index) => {
        if (index in result) {
          let clone = JSON.parse(JSON.stringify(item));
          clone.tasks = result[index]
          return clone;
        } 
        return item
      });
      console.log(state, newState);

      dispatch(setGroups(newState));
    }
  }
  return (
    <Flex>
      <DragDropContext onDragEnd={onDragEnd}>
        {winReady ? (
            <Box display="flex" flexDirection="row" width="100%">
              {state.map((el, ind) => (
                <TaskGroup
                  group={el}
                  ind={ind}
                  key={ind}
                ></TaskGroup>
              ))}
            </Box>
        ) : null}
      </DragDropContext>
    </Flex>
  );
}
