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

// Import Hooks
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { useDisclosure } from "@chakra-ui/react";
import { useQuickModify } from "@/utils";
import { useRouter } from "next/navigation";

import { AddIcon, Icon } from "@chakra-ui/icons";
import { HiPencil } from "react-icons/hi";

// TS type for prop
interface Props {
  parent: string;
  children?: ReactNode;
  board?: string;
}

function EditBoard({ parent, board, children }: Props) {
  // Redux
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(selectActiveBoard);
  const boards = useAppSelector(selectBoards);

  const router = useRouter();

  const { newBoard, deleteBoard } = useQuickModify();

  const editBoard = function (e: string) {
    e && board ? dispatch(renameBoard([board, e])) : null;
  };
  const createBoard = function (e: string) {
    if (!e) return;
    const name = newBoard(parent, e);
    router.push(`/board/${name}`);
  };
  const deleteBoardandMove = function () {
    if (!board) return;
    if (board == activeBoard) router.push(`/project/${parent}`);
    deleteBoard(board);
  };
  return (
    <Box m={0}>
      <Box
        flex="initial"
        position="relative"
        bg={activeBoard && activeBoard == board ? "gray.600" : ""}
        borderTopRadius="5px"
        _hover={{
          bg: "gray.500",
        }}
      >
        {children ? (
          <>
            {children}
            <PopoverEdit
              mode="edit"
              obj="Board"
              editCallback={editBoard}
              deleteCallback={deleteBoardandMove}
              initial={(board && boards[board].name) || ""}
              deleteWarning={`Are you sure you want to delete this Board?\nAll Groups and Tasks from this Board will be removed.\nThis action is irrevesible!`}
            >
              <Tooltip label="Edit Board">
                <Box position="absolute" top="6px" right="2px">
                  <Icon as={HiPencil} boxSize="20px" m={1} cursor="pointer" />
                </Box>
              </Tooltip>
            </PopoverEdit>
          </>
        ) : (
          <PopoverEdit mode="create" obj="Board" createCallback={createBoard}>
            <>
              <Box className="tabLink" fontWeight="semibold">
                New
              </Box>
              <Tooltip label="New Board">
                <Box position="absolute" top="6px" right="2px">
                  <AddIcon boxSize="20px" m={1} cursor="pointer" />
                </Box>
              </Tooltip>
            </>
          </PopoverEdit>
        )}
      </Box>
    </Box>
  );
}

export default EditBoard;
