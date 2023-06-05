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
import Link from "next/link";

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

  const [boardName, setBoardName] = useState("");
  const { onOpen, onClose, isOpen } = useDisclosure();
  const router = useRouter();

  const { newBoard, deleteBoard } = useQuickModify();

  const editBoard = function () {
    boardName && board ? dispatch(renameBoard([board, boardName])) : null;
    setBoardName("");
  };
  const createBoard = function () {
    boardName ? newBoard(parent, boardName) : null;
    setBoardName("");
  };
  const deleteBoardandMove = function () {
    if (!board) return;
    router.push(`/project/${parent}`);
    deleteBoard(board);
  };
  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
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
              <PopoverTrigger>
                <Tooltip label="Edit Board">
                  <Box
                    position="absolute"
                    top="6px"
                    right="2px"
                    onClick={onOpen}
                  >
                    <Icon as={HiPencil} boxSize="20px" m={1} cursor="pointer" />
                  </Box>
                </Tooltip>
              </PopoverTrigger>
            </>
          ) : (

              <PopoverTrigger>
                <Box                     onClick={onOpen}>
              <Box className="tabLink" fontWeight="semibold">
                New
              </Box>
                <Tooltip label="New Board">
                  <Box
                    position="absolute"
                    top="6px"
                    right="2px"

                  >
                    <AddIcon boxSize="20px" m={1} cursor="pointer" />
                  </Box>
                </Tooltip>
                </Box>
              </PopoverTrigger>
          )}
        </Box>
      </Box>
      <Portal>
        <PopoverContent color="black">
          <PopoverArrow />
          <PopoverHeader fontWeight="semibold">
            {children ? "Edit Board" : "New Board"}
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Text fontSize="12px" mb="6px">
              Board Name
            </Text>
            <Input
              placeholder="Enter Board Name"
              value={boardName || ""}
              onChange={(e) => setBoardName(e.target.value)}
            />
          </PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              {children ? (
                <Popover>
                  <Box>
                    <PopoverTrigger>
                      <Button colorScheme="red">Delete Board</Button>
                    </PopoverTrigger>
                  </Box>
                  <PopoverContent color="black">
                    <PopoverArrow />
                    <PopoverHeader fontWeight="semibold">
                      Delete Board
                    </PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                      Are you sure you want to delete this tag?
                      <br />
                      All Groups and Tasks from this Board will be removed.
                      <br />
                      This action is irrevesible!
                      <br />
                    </PopoverBody>
                    <PopoverFooter display="flex" justifyContent="flex-end">
                      <ButtonGroup size="sm">
                        <Button
                          colorScheme="red"
                          onClick={() => {
                            deleteBoardandMove();
                            onClose();
                          }}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              ) : null}
              {children ? (
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    editBoard();
                    onClose();
                  }}
                >
                  Edit Name
                </Button>
              ) : (
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    createBoard();
                    onClose();
                  }}
                >
                  Create Board
                </Button>
              )}
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default EditBoard;
