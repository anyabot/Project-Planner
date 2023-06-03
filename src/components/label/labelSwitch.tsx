import { getDate } from "@/utils";

//Import Components
import {
  Box,
  Heading,
  Circle,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverFooter,
  PopoverBody,
  PopoverCloseButton,
  PopoverHeader,
  Checkbox,
  ButtonGroup,
} from "@chakra-ui/react";
import ColorPicker from "../utils/colorPicker";

// Import Icons
import { DeleteIcon, Icon } from "@chakra-ui/icons";
import { HiPencil } from "react-icons/hi";

// Import Redux State
import { selectTasks, toogleTag } from "@/store/taskSlice";
import {
  selectActiveBoard,
  selectBoards
} from "@/store/boardSlice";

// Import Hooks
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { useQuickModify } from "@/utils"

// TS type for prop
interface Props {
  task_key: string
  onClose: () => void
}

function LabelSwitch({ task_key, onClose }: Props) {
  // Redux
  const dispatch = useAppDispatch()
  const activeBoard = useAppSelector(selectActiveBoard);
  const boards = useAppSelector(selectBoards);
  const tasks = useAppSelector(selectTasks);

  // Must be here to avoid "Rendered more hooks than during the previous render"
  const task = tasks[task_key]
  if (!activeBoard) return null;

  const tags = boards[activeBoard].tags
  const tags_key = Object.keys(tags)

  const [tagName, setTagName] = useState("")
  const [tagColor, setTagColor] = useState("gray")

  const {newTag} = useQuickModify()

  const addTag = function (name: string, color: string) {
    name ? newTag(activeBoard, name, color) : null
    setTagName("")
    onClose()
  };

  return (
        <PopoverContent color="black">
            <PopoverArrow />
            <PopoverHeader fontWeight="semibold">Add Tag</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              {tags_key.map(tag => (
                <Box
              position="relative"
            >
              <Checkbox
                isChecked={task.tags.includes(tag)}
                w="full"
                onChange={() => {
                  dispatch(toogleTag([task_key, tag]));
                }}
                bgColor={tags[tag].color + ".200"}
              >
                {tags[tag].name}
              </Checkbox>
              <Icon position="absolute" right="0" as={HiPencil} size="32px" />
            </Box>
              ))}
            
            </PopoverBody>
            <PopoverFooter display="flex" justifyContent="flex-end">
              <ButtonGroup size="sm">
                <Button colorScheme="red" onClick={() => addTag(tagName, tagColor)}>Create New Tag</Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
  );
}

export default LabelSwitch;
