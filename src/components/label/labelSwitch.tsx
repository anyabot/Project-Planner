//Import Components
import {
  Box,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverFooter,
  PopoverBody,
  PopoverCloseButton,
  PopoverHeader,
  Checkbox,
  ButtonGroup,
  Tooltip,
} from "@chakra-ui/react";
import Checker from "../utils/checker";

// Import Icons
import { Icon } from "@chakra-ui/icons";
import { HiPencil } from "react-icons/hi";

// Import Redux State
import { selectTasks, toogleTag } from "@/store/taskSlice";
import { selectActiveBoard, selectBoards } from "@/store/boardSlice";

// Import Hooks
import { useAppSelector, useAppDispatch } from "@/hooks";

// TS type for prop
interface Props {
  task_key: string;
  changeMode: () => void;
  changeEditing: (e: string) => void;
}

function LabelSwitch({ task_key, changeMode, changeEditing }: Props) {
  // Redux
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(selectActiveBoard);
  const boards = useAppSelector(selectBoards);
  const tasks = useAppSelector(selectTasks);

  // Must be here to avoid "Rendered more hooks than during the previous render"
  const task = tasks[task_key];
  if (!activeBoard) return null;

  const tags = boards[activeBoard].tags;
  const tags_key = Object.keys(tags);
  return (
    <PopoverContent color="black">
      <PopoverArrow />
      <PopoverHeader fontWeight="semibold">Add Tag</PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
        {tags_key.map((tag) => (
          <Box
            key={tag}
            position="relative"
            display="flex"
            width="full"
            textAlign="center"
          >
            <Checker
              checked={task.tags.includes(tag)}
              callback={() => {
                dispatch(toogleTag([task_key, tag]));
              }}
              color={tags[tag].color}
            >
              <Box maxW="200px" className="clipText" lineHeight="normal">{tags[tag].name}</Box>
            </Checker>
            <Box flex="initial">
              <Tooltip label="Edit Tag">
                <Box>
                <Icon
                  as={HiPencil}
                  boxSize="20px"
                  m={1}
                  cursor="pointer"
                  onClick={() => changeEditing(tag)}
                />
                </Box>
              </Tooltip>
            </Box>
          </Box>
        ))}
      </PopoverBody>
      <PopoverFooter display="flex" justifyContent="flex-end">
        <ButtonGroup size="sm">
          <Button colorScheme="red" onClick={() => changeMode()}>
            Create New Tag
          </Button>
        </ButtonGroup>
      </PopoverFooter>
    </PopoverContent>
  );
}

export default LabelSwitch;
