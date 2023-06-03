import dynamic from "next/dynamic";
import { Board, Group } from "@/interfaces/task";

//Import Conponents
import {
  DragDropContext,
  DropResult,
  DraggableLocation,
} from "react-beautiful-dnd";
import { Box } from "@chakra-ui/react";
const TaskGroup = dynamic(import("@/components/tasks/taskGroup"));
import Error from "next/error";

// Import Redux States
import { selectGroups, setTasks } from "@/store/groupSlice";
import { setActiveProject } from "@/store/projectSlice";
import {
  selectBoards,
  selectActiveBoard,
  setActiveBoard,
} from "@/store/boardSlice";

//Import Hooks
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { useState, useEffect } from "react";

const reorder = (list: string[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (
  source: string[],
  destination: string[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: { [key: string]: string[] } = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return [sourceClone, destClone];
};

export default function Home() {
  const router = useRouter();

  // Redux
  const dispatch = useAppDispatch();
  const boards = useAppSelector(selectBoards);
  const activeBoard = useAppSelector(selectActiveBoard);
  const groups = useAppSelector(selectGroups);

  // UseState
  const [id, setId] = useState("");
  const [winReady, setwinReady] = useState(false);
  const [state, setState] = useState<Board>();

  // Use Effects
  useEffect(() => {
    if (!router.isReady) return;
    let temp = router.query.id as string;
    setId(temp);
    if (temp in boards) {
      setState(boards[temp]);
      dispatch(setActiveBoard(temp));
      dispatch(setActiveProject(boards[temp].parent));
    }
  }, [router.isReady, router.query.id, boards]);
  useEffect(() => {
    setwinReady(true);
  }, []);

  //Utility Functions
  function onDragEnd(result: DropResult) {
    if (!state) return;
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const group = groups[state.groups[sInd]];
      const items = reorder(group.tasks, source.index, destination.index);
      dispatch(setTasks([state.groups[sInd], items]));
    } else {
      const sGroup = groups[state.groups[sInd]];
      const dGroup = groups[state.groups[dInd]];
      const result = move(sGroup.tasks, dGroup.tasks, source, destination);
      dispatch(setTasks([state.groups[sInd], result[0]]));
      dispatch(setTasks([state.groups[dInd], result[1]]));
    }
  }
  if (router.isReady) {
    if (!activeBoard || !(activeBoard in boards))
      return (
        <>
          <Error statusCode={404} />
        </>
      );

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        {winReady ? (
          <Box display="flex" flexDirection="row" width="100%">
            {state
              ? state.groups.map((el, ind) => (
                  <TaskGroup
                    parent={id}
                    group_key={el}
                    ind={ind}
                    key={ind}
                  ></TaskGroup>
                ))
              : null}
          </Box>
        ) : null}
      </DragDropContext>
    );
  }
}
