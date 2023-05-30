import { Box, Stack } from "@chakra-ui/react";
import NavLink from "./navlink"
import { Input } from "@chakra-ui/react";
import {SearchIcon, DragHandleIcon, DownloadIcon, BellIcon, QuestionOutlineIcon} from "@chakra-ui/icons";

function NavContent () {
  return (
    <Box
      w="100%"
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