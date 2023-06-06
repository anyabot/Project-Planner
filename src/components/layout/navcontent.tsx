//Import Components
import { Box, Stack, Text, Input } from "@chakra-ui/react";
import NavLink from "./navlink";
import Link from "next/link";
import EditBoard from "./editBoard";
import EditProject from "./editProject";

//Import Icons
import {
  ChevronLeftIcon,
} from "@chakra-ui/icons";

//Import Redux States
import { selectActiveProject, selectProjects } from "@/store/projectSlice";
import { selectBoards, selectActiveBoard } from "@/store/boardSlice";

//Import Hooks
import { useAppSelector } from "@/hooks";
import { useRouter } from "next/navigation";

function NavContent() {
  const projects = useAppSelector(selectProjects)
  const activeProject = useAppSelector(selectActiveProject);
  const project = activeProject && projects[activeProject]
  const allBoards = useAppSelector(selectBoards);
  const boards = Object.keys(allBoards).filter((board) => {
    return allBoards[board].parent == activeProject;
  });
  const router = useRouter()

  return project ? (
    <Box w="100%" bg={"gray.500"}>
      <Stack w="100%" spacing={8} align="center" direction={"row"} m={2}>
        <Stack marginLeft="auto" w="100%" direction={"row"}>
          <ChevronLeftIcon boxSize="30px" onClick={() => router.push('/')} cursor="pointer"/>
          <EditProject project={activeProject}>
            {project.name}
          </EditProject>
        </Stack>
        <Stack marginLeft="auto" direction={"row"}></Stack>
      </Stack>
      <Stack w="100%" m="0px" align="center" direction={"row"} bg="gray.400">
        {boards.map((board) => (
          <EditBoard key={board} parent={activeProject} board={board}>
            <Box
              className="tabLink"
              as={Link}
              href={`/board/${board}`}
              fontWeight="semibold"
            >
              {allBoards[board].name}
            </Box>
          </EditBoard>
        ))}
        <EditBoard parent={activeProject}></EditBoard>
      </Stack>
    </Box>
  ) : (
    <Box w="100%" py={4} bg={"gray.500"}>
      <Stack w="100%" spacing={8} align="center" direction={"row"}>
        <Stack marginLeft="auto" w="100%" direction={"row"}>
          <NavLink to="/" fontSize="xl" mx={4}>
            Home
          </NavLink>
        </Stack>
        <Stack marginLeft="auto" direction={"row"}></Stack>
      </Stack>
    </Box>
  );
}

export default NavContent;
