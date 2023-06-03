//Import Components
import { Box, Stack, Text } from "@chakra-ui/react";
import NavLink from "./navlink"
import { Input } from "@chakra-ui/react";
import Link from "next/link";

//Import Icons
import {SearchIcon, DragHandleIcon, DownloadIcon, BellIcon, QuestionOutlineIcon} from "@chakra-ui/icons";

//Import Redux States
import { selectActiveProject } from '@/store/projectSlice'
import { selectBoards, } from '@/store/boardSlice'

//Import Hooks
import { useAppSelector } from '@/hooks';

function NavContent () {
  const activeProject = useAppSelector(selectActiveProject);
  const allBoards = useAppSelector(selectBoards);
  const boards = Object.keys(allBoards).filter(board => 
    {
      return allBoards[board].parent == activeProject
    })
  return (
    activeProject ? <Box
    w="100%"
    pb={0}
    pt={4}
    px={1}
  >
    <Stack
      w="100%"
      spacing={8}
      align="center"
      direction={"row"}
    >
      <Stack marginLeft="auto" w="100%"         direction={"row"}>
      <DragHandleIcon boxSize="30px"/>
      <NavLink to="/" fontSize='xl' mx={4}>{activeProject}</NavLink>
      </Stack>
      <Stack marginLeft="auto"          direction={"row"}>
      <DownloadIcon boxSize="30px"/>
      <QuestionOutlineIcon boxSize="30px"/>
      <BellIcon boxSize="30px"/>
        <Input placeholder="Enemy Name" defaultValue="search term" width="300px"/>
        <SearchIcon boxSize="30px"/>
        <DragHandleIcon boxSize="30px"/>
        </Stack>
      
    </Stack>
    <Stack
      w="100%"
      spacing={8}
      align="center"
      direction={"row"}
    >
      {boards.map(board => <Box key={board} className="tabLink" as={Link} href={`/board/${board}`}>{allBoards[board].name}</Box>)}
      
    </Stack>
  </Box> : <Box
      w="100%"
      py={4}
      px={1}
    >
      <Stack
        w="100%"
        spacing={8}
        align="center"
        direction={"row"}
      >
        <Stack marginLeft="auto" w="100%"         direction={"row"}>
        <DragHandleIcon boxSize="30px"/>
        <NavLink to="/" fontSize='xl' mx={4}>Home</NavLink>
        </Stack>
        <Stack marginLeft="auto"          direction={"row"}>
        <DownloadIcon boxSize="30px"/>
        <QuestionOutlineIcon boxSize="30px"/>
        <BellIcon boxSize="30px"/>
          <Input placeholder="Enemy Name" defaultValue="search term" width="300px"/>
          <SearchIcon boxSize="30px"/>
          <DragHandleIcon boxSize="30px"/>
          </Stack>
        
      </Stack>
    </Box>
  );
};

export default NavContent