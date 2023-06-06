// Import Components 
import {
  Box,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Tag,
  Text,
  CardFooter,
  Progress,
  ListItem,
  UnorderedList
} from "@chakra-ui/react";

// Import Redux State 
import { setModal } from "@/store/stateSlice";
import { selectGroups } from "@/store/groupSlice";
import { selectTasks } from "@/store/taskSlice"
import { selectBoards, selectActiveBoard } from "@/store/boardSlice";

// Import Icons
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

//Import Hooks 
import { useAppSelector, useAppDispatch } from "@/hooks";
import { useState } from "react";

// TS type for prop
interface Props {
  group_key: string;
  task_key: string;
  search?: string
}

function TaskCard({ group_key, task_key, search }: Props) {
  // Redux 
  const dispatch = useAppDispatch();
  const boards = useAppSelector(selectBoards);
  const activeBoard = useAppSelector(selectActiveBoard);
  const groups = useAppSelector(selectGroups);
  const tasks = useAppSelector(selectTasks);
  const task = tasks[task_key]
  if (!activeBoard) return (null)

  const board = boards[activeBoard]
  const [progessOpen, setOpen] = useState(false);
  const tags = board.tags
  const modal = function () {
    dispatch(setModal(task_key));
  };
  const getCompleted = function () {
    return task.subtasks.filter((st) => st[1]).length;
  };
  const getLineThrough = (b: boolean) => {
    return b ? "" : "line-through"
  }
  if (!task) return null
  return (
    <Box m="auto" p="2px" display={search ? task.name.toLowerCase().includes(search.toLowerCase()) ? "" : "none" : ""}>
      <Card m="2" _hover={{ color: "blue" }}  onClick={modal} cursor="pointer">
        {task.tags.length ? (
          <CardHeader display="flex" flexDirection="row" p="2">
            {task.tags.map((tag) => 
              tags[tag] ? <Tag key={`tag${tag}`} colorScheme={tags[tag].color} px="5px" mx="5px">
                {tags[tag].name}
              </Tag> : null
            )}
          </CardHeader>
        ) : null}
        <CardBody p={2}>
          <Heading m={0} size="md">
            {task.name}
          </Heading>
        </CardBody>
        <CardFooter p="2" flexDirection="column">
          <>
            <Box
              display="flex"
              flexDirection="row"
              color="gray"
              _hover={{
                background: "gray.100",
              }}
              onClick={(e) => {
                e.stopPropagation()
                setOpen(!progessOpen)
              }}  cursor="pointer"
            >
              {task.subtasks.length ? (
                <>
                <Progress
                  borderRadius="3px"
                  colorScheme="blue"
                  height="6px"
                  value={(getCompleted() / task.subtasks.length) * 100}
                  w="75%"
                  m="3px"
                />
                <Text fontSize="12px" lineHeight="12px" marginLeft="auto">
                {getCompleted()} / {task.subtasks.length}
              </Text>
              {progessOpen ? (
                <ChevronUpIcon boxSize="12px" />
              ) : (
                <ChevronDownIcon boxSize="12px" />
              )}
              </>
              ) : null}
              
            </Box>
            <UnorderedList>
            {progessOpen
              ? task.subtasks.map((st, i) => <ListItem key={i} display="block" color="black" textDecoration={getLineThrough(st[1])}>{st[0]}</ListItem>)
              : null}
              </UnorderedList>
          </>
        </CardFooter>
      </Card>
    </Box>
  );
}

export default TaskCard;
