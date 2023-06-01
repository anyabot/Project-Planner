import { Box, Stack } from "@chakra-ui/react";
import { GroupData, TaskData } from "@/interfaces/task";
import { useState } from "react";
interface Props {
  task: TaskData;
  ind: number;
  groupInd: number;
}
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Tag,
  Text,
  Button,
  Image,
  Divider,
  CardFooter,
  Progress,
  ListItem,
  UnorderedList
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { setModal, selectTags } from "@/store/stateSlice";

function TaskCard({ task, ind, groupInd }: Props) {
  const [progessOpen, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const tags = useAppSelector(selectTags);
  const modal = function () {
    dispatch(setModal([groupInd, ind]));
  };
  const getCompleted = function () {
    return task.subtasks.filter((st) => st[1]).length;
  };
  const getLineThrough = (b: boolean) => {
    return b ? "" : "line-through"
  }
  return (
    <Box m="auto">
      <Card m="2" _hover={{ color: "blue" }}>
        {task.tags.length ? (
          <CardHeader display="flex" flexDirection="row" p="2">
            {task.tags.map((tag) => (
              <Tag colorScheme={tags[tag].color} px="5px" mx="5px">
                {tags[tag].name}
              </Tag>
            ))}
          </CardHeader>
        ) : null}
        <CardBody p={2}  onClick={modal} cursor="pointer">
          <Heading m={0} size="md">
            {task.name}
          </Heading>
        </CardBody>
        <CardFooter p="2">
          <>
            <Box
              display="contents"
              color="gray"
              _hover={{
                background: "gray.100",
              }}
              onClick={() => setOpen(!progessOpen)}  cursor="pointer"
            >
              {task.subtasks.length ? (
                <Progress
                  borderRadius="3px"
                  colorScheme="blue"
                  height="6px"
                  value={(getCompleted() / task.subtasks.length) * 100}
                  w="75%"
                  m="3px"
                />
              ) : null}
              <Text fontSize="12px" lineHeight="12px" marginLeft="auto">
                {getCompleted()} / {task.subtasks.length}
              </Text>
              {progessOpen ? (
                <ChevronUpIcon boxSize="12px" />
              ) : (
                <ChevronDownIcon boxSize="12px" />
              )}
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
