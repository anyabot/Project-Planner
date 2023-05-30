import { Box, Stack } from "@chakra-ui/react";
import { GroupData, TaskData } from "@/interfaces/task";
import { useState } from "react";
interface Props {
  task: TaskData;
  ind: number;
}
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Circle,
  Text,
  Button,
Image,
Divider,
CardFooter
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import HeartBeatIcon from "../../icons/heartbeat.svg";
import { useAppSelector, useAppDispatch } from "@/hooks";
import {
  setModel
} from "@/store/stateSlice";
const iconTypes: { [key: string]: any } = {
  heartbeat: HeartBeatIcon,
};

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `${grid}px`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  width: 320,
});

const grid = 8;

function TaskCard({ task, ind }: Props) {
  const dispatch = useAppDispatch();
  const setModal = function() {
    dispatch(setModel(task))
  }
  return (
    <Card w="100%" m="auto" cursor="pointer" onClick={setModal}>
      <CardHeader display="flex" flexDirection="row" p="2">
        <Text m="2">type</Text>
        <Text m="2" w="100%">status</Text>
        <Text m="2">prev</Text>
        <Text m="2">next</Text>
      </CardHeader>
      <CardBody p="2">
      <Stack spacing="3">
      <Heading size="md">{task.name}</Heading>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />

          <Heading size="md">Ma Hang - Chi Tiet - Mau Sac</Heading>
          <Text>
            Khach Hang
          </Text>
          <Text>
            Thong Tin Khac
          </Text>
        </Stack>
      </CardBody>
      <CardFooter p="2" display="flex" flexDirection="row">
        <Box color="orange" display="flex" alignItems="center">
          <CalendarIcon/>
          <Text p="2" m={0}>
          Mar, 22
          </Text>
          <Heading p="2" m={0} size="xs">
          Nguoi Thuc Hien
          </Heading>
        </Box>
        
      </CardFooter>
    </Card>
  );
}

export default TaskCard;
