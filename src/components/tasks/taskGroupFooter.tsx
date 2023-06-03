//Import Components
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverFooter,
  PopoverBody,
  PopoverCloseButton,
  PopoverHeader,
  Portal,
  Input ,
  ButtonGroup,
} from "@chakra-ui/react";

// Import Icons

// Import Redux State
import {
  selectGroups,
} from "@/store/groupSlice";
import {
  selectActiveBoard,
} from "@/store/boardSlice";

// Import Hooks
import { useState } from "react";
import { useAppSelector } from "@/hooks";
import { useQuickModify } from "@/utils"
import { useDisclosure } from "@chakra-ui/react"

// TS type for prop
interface Props {
  group_key: string;
}

function TaskGroupFooter({ group_key }: Props) {
  // Redux
  const activeBoard = useAppSelector(selectActiveBoard);
  const groups = useAppSelector(selectGroups);
  const group = groups[group_key];
  if (!activeBoard) return null;

  const [taskName, setTaskName] = useState("")

  const {newTask} = useQuickModify()
  const { onOpen, onClose, isOpen } = useDisclosure()

  const addNewItem = function (name: string) {
    name ? newTask(group_key, name) : null
    setTaskName("")
    onClose()
  };

  return (
      <Popover 
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement='top-start'>
        <PopoverTrigger>
          <Button
            bg={group.color + ".300"}
            _hover={{ bg: group.color + ".400" }}
            margin="auto"
            display="block"
            width="100%"
          >
            Add Task
          </Button>
          </PopoverTrigger>
        <Portal>
        <PopoverContent color="black">
            <PopoverArrow />
            <PopoverHeader fontWeight="semibold">Add Task</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
            <Input placeholder='Enter Task Name' value={taskName || ""} onChange={(e => setTaskName(e.target.value))}/>
            </PopoverBody>
            <PopoverFooter display="flex" justifyContent="flex-end">
              <ButtonGroup size="sm">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button colorScheme="red" onClick={() => addNewItem(taskName)}>Add Task</Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
  );
}

export default TaskGroupFooter;
