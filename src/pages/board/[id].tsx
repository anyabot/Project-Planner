import dynamic from "next/dynamic";
import { Board, Group } from "@/interfaces/task";
import { debounce } from "lodash";
import { FormEvent } from "react";

//Import Conponents
import {
  DragDropContext,
  DropResult,
  DraggableLocation,
} from "react-beautiful-dnd";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
const TaskGroup = dynamic(import("@/components/tasks/taskGroup"));
import AddGroup from "@/components/tasks/addGroup";
import SearchBar from "@/components/utils/searchBar";
import LabelEditor from "@/components/label/labelEditor";
import Error from "next/error";
import Head from "next/head";

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
import { useState, useEffect, useCallback } from "react";
import { useQuickModify } from "@/utils";

//Import Icons
import { AddIcon, Icon } from "@chakra-ui/icons";
import { HiFilter } from "react-icons/hi";

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
  const [search, setSearch] = useState("");
  const [filterTags, setFilterTags] = useState<string[]>([]);

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
  useEffect(() => {
    state
      ? setFilterTags(
          filterTags.filter((tag) => Object.keys(state.tags).includes(tag))
        )
      : null;
  }, [state?.tags]);

  //Utility Functions
  const addOrRemove = debounce((e: string) => {
    var index = filterTags.indexOf(e);
    if (index === -1) {
      setFilterTags([...filterTags, e]);
    } else {
      const temp = [...filterTags]
      temp.splice(index, 1)
      setFilterTags(temp);
    }
  }, 200)

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

  const handleChange = debounce((e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setSearch(target.value);
  }, 300);

  const { newGroupAt } = useQuickModify();

  const addGroupEnd = useCallback(
    (name: string, color: string) => {
      activeBoard
        ? newGroupAt(
            activeBoard,
            boards[activeBoard].groups.length,
            name,
            color
          )
        : null;
    },
    [boards, activeBoard]
  );

  if (router.isReady) {
    if (!activeBoard || !(activeBoard in boards))
      return (
        <>
          <Error statusCode={404} />
        </>
      );

    return (
      <>
        <Head>
          <title>{boards[activeBoard].name}</title>
        </Head>
        <Stack flexDirection="row" m={4} alignItems="center" gap={8}>
          <LabelEditor
            initial_mode="filter"
            key_list={filterTags}
            filterCallback={addOrRemove}
          >
            <Box>
              <Icon as={HiFilter} boxSize="20px" />
              Filter Tags
            </Box>
          </LabelEditor>

          <SearchBar placeholder="Search Tasks..." callback={handleChange} />
        </Stack>
        <DragDropContext onDragEnd={onDragEnd}>
          {winReady ? (
            <Box
              display="flex"
              flexDirection="row"
              width="100%"
              h="calc(100% - 64px)"
            >
              {state
                ? state.groups.map((el, ind) => (
                    <TaskGroup
                      parent={id}
                      group_key={el}
                      ind={ind}
                      key={ind}
                      search={search}
                      filter_tags={filterTags}
                    ></TaskGroup>
                  ))
                : null}
              <AddGroup callback={addGroupEnd}>
                <Button
                  height="60px"
                  m="8px"
                  bg={"gray.500"}
                  _hover={{ bg: "gray.600" }}
                  margin="auto"
                  display="block"
                  width="320px"
                >
                  <>
                    <AddIcon boxSize="10px" />
                    Add Group
                  </>
                </Button>
              </AddGroup>
            </Box>
          ) : null}
        </DragDropContext>
      </>
    );
  }
}
