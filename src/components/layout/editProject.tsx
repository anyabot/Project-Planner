import { ReactNode } from "react";

//Import Components
import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverFooter,
  PopoverBody,
  PopoverCloseButton,
  PopoverHeader,
  Text,
  Input,
  ButtonGroup,
  Tooltip,
  Portal,
} from "@chakra-ui/react";
import PopoverEdit from "../utils/popoverEdit";

// Import Redux State
import {
  selectBoards,
  selectActiveBoard,
  renameBoard,
} from "@/store/boardSlice";
import { selectProjects, renameProject } from "@/store/projectSlice";

// Import Hooks
import { useAppSelector, useAppDispatch } from "@/hooks";
import { useQuickModify } from "@/utils";
import { useRouter } from "next/navigation";

// TS type for prop
interface Props {
  children?: ReactNode;
  project?: string;
}

function EditProject({ project, children }: Props) {
  // Redux
  const dispatch = useAppDispatch();
  const activeProject = useAppSelector(selectActiveBoard);
  const projects = useAppSelector(selectProjects);

  const router = useRouter();

  const { deleteProject } = useQuickModify();

  const editProject = function (e: string) {
    e && project ? dispatch(renameProject([project, e])) : null;
  };
  const deleteProjectandMove = function () {
    if (!project) return;
    router.push(`/`);
    deleteProject(project);
  };
  return (
    <PopoverEdit
      mode="edit"
      obj="Project"
      editCallback={editProject}
      deleteCallback={deleteProjectandMove}
      initial={(project && projects[project].name) || ""}
      deleteWarning={`Are you sure you want to delete this Project?\nAll Boards, Groups and Tasks from this Board will be removed.\nThis action is irrevesible!`}
    >
      <Tooltip label="Edit Project">
      <Text display="block" my={0} fontWeight="bold" fontSize="xl" mx={4}>
        {children}
      </Text>
      </Tooltip>
    </PopoverEdit>
  );
}

export default EditProject;
