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
import {
  Box,
  Button,
  Stack,
  Flex,
  AvatarGroup,
  Avatar,
} from "@chakra-ui/react";
const TaskGroup = dynamic(import("@/components/tasks/taskGroup"));
import AddGroup from "@/components/tasks/addGroup";
import SearchBar from "@/components/utils/searchBar";
import LabelEditor from "@/components/label/labelEditor";
import MemberSwitch from "@/components/member/memberSwitch";
import UserSwitch from "@/components/member/userSwitch";
import PopoverDelete from "@/components/utils/popoverDelete";
import Error from "next/error";
import Head from "next/head";

// Import Redux States
import { selectGroups, setTasks } from "@/store/groupSlice";
import { setActiveProject } from "@/store/projectSlice";
import {
  selectBoards,
  selectActiveBoard,
  setActiveBoard,
  addMemberToBoard,
  removeMemberFromBoard,
} from "@/store/boardSlice";
import { selectUsers, selectCurrentUser } from "@/store/stateSlice";

//Import Hooks
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { useState, useEffect, useCallback } from "react";
import { useQuickModify } from "@/utils";

//Import Icons
import { AddIcon, Icon } from "@chakra-ui/icons";
import { HiFilter, HiUserAdd } from "react-icons/hi";

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
  const users = useAppSelector(selectUsers);
  const curr_user = useAppSelector(selectCurrentUser);

  // UseState
  const [id, setId] = useState("");
  const [winReady, setwinReady] = useState(false);
  const [state, setState] = useState<Board>();
  const [search, setSearch] = useState("");
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [filterMembers, setFilterMembers] = useState<string[]>([]);
  const [members, setMembers] = useState<string[]>([]);

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
  useEffect(() => {
    state
      ? setFilterMembers(
          filterMembers.filter((member) =>
            state.members.some((e) => e.id === member)
          )
        )
      : null;
    state ? setMembers(state.members.map((member) => member.id)) : null;
  }, [state?.members]);

  //Utility Functions
  const addOrRemove = debounce((e: string) => {
    var index = filterTags.indexOf(e);
    if (index === -1) {
      setFilterTags([...filterTags, e]);
    } else {
      const temp = [...filterTags];
      temp.splice(index, 1);
      setFilterTags(temp);
    }
  }, 200);

  const addOrRemoveMembers = debounce((e: string) => {
    var index = filterMembers.indexOf(e);
    if (index === -1) {
      setFilterMembers([...filterMembers, e]);
    } else {
      const temp = [...filterMembers];
      temp.splice(index, 1);
      setFilterMembers(temp);
    }
  }, 200);
  const addMember = (e: string) => {
    if (!activeBoard) return;
    var index = members.indexOf(e);
    if (index === -1) {
      dispatch(addMemberToBoard([activeBoard, e]));
    }
  };

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

  const { newGroupAt, deleteMember } = useQuickModify();

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
        <Flex flexDirection="row" m={4} alignItems="center" gap={8}>
          <AvatarGroup>
            {boards[activeBoard].members.map((member, i) =>
              member.id in users ? (
                <PopoverDelete
                  key={member.id}
                  obj="Member"
                  deleteCallback={() => deleteMember(member.id)}
                  deleteWarning={`Are you sure you want to remove this member from the board?\nThey will be removed from all Tasks\nThis action is irrevesible!`}
                >
                  <Avatar
                    size="sm"
                    mx="-0.25rem"
                    cursor="pointer"
                    name={users[member.id].name}
                    src={users[member.id].avatar}
                    title={users[member.id].name}
                    _hover={{ zIndex: 2 }}
                  />
                </PopoverDelete>
              ) : null
            )}
            <UserSwitch
              key_list={members}
              callback={addMember}
              text="Edit Members"
            >
              <Avatar
                size="sm"
                mx="-0.25rem"
                cursor="pointer"
                icon={<Icon as={HiUserAdd} boxSize="24px" />}
                _hover={{ zIndex: 2 }}
              />
            </UserSwitch>
          </AvatarGroup>
          <LabelEditor
            initial_mode="filter"
            key_list={filterTags}
            filterCallback={addOrRemove}
          >
            <Box fontWeight="semibold" cursor="pointer">
              <Icon as={HiFilter} boxSize="20px" />
              Filter Tags
            </Box>
          </LabelEditor>
          <MemberSwitch
            key_list={filterMembers}
            callback={addOrRemoveMembers}
            text="Filter Members"
          >
            <Box fontWeight="semibold" cursor="pointer">
              <Icon as={HiFilter} boxSize="20px" />
              Filter Members
            </Box>
          </MemberSwitch>

          <SearchBar placeholder="Search Tasks..." callback={handleChange} />
        </Flex>
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
                      filter_members={filterMembers}
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
