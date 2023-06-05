import { ReactNode } from "react";

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
  Text,
  Input,
  ButtonGroup,
  Tooltip,
  Portal,
} from "@chakra-ui/react";
import ColorPicker from "../utils/colorPicker";

// Import Redux State
import { selectBoards, selectActiveBoard, addTag } from "@/store/boardSlice";

// Import Hooks
import { useState } from "react";
import { useAppSelector } from "@/hooks";
import { useDisclosure } from "@chakra-ui/react"

// TS type for prop
interface Props {
  callback: (n:string, c:string) => void;
  children: ReactNode
}

function AddGroup({ callback, children }: Props) {
  // Redux
  const activeBoard = useAppSelector(selectActiveBoard);
  if (!activeBoard) return null;
  const boards = useAppSelector(selectBoards);
  const board = boards[activeBoard];

  const [groupName, setGroupName] = useState("")
  const [groupColor, setGroupColor] = useState("gray")
  const { onOpen, onClose, isOpen } = useDisclosure()

  const addNewGroup = function () {
    groupName ? callback(groupName, groupColor) : null
    setGroupName("")
  };

  return (
  <Popover          isOpen={isOpen}
  onOpen={onOpen}
  onClose={onClose}>
    <Tooltip label="Add Group">
      <Box>
        <PopoverTrigger>
          {children}
        </PopoverTrigger>
      </Box>
    </Tooltip>
    <PopoverContent color="black">
      <PopoverArrow />
      <PopoverHeader fontWeight="semibold">
        Add Group
      </PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
      <Text fontSize="12px" mb="6px">Group Name</Text>
            <Input placeholder='Enter Group Name' value={groupName || ""} onChange={(e => setGroupName(e.target.value))}/>
            <Text fontSize="12px" mb="6px">Group Color</Text>
            <ColorPicker active={groupColor} callback={e => setGroupColor(e)}/>
      </PopoverBody>
      <PopoverFooter display="flex" justifyContent="flex-end">
        <ButtonGroup size="sm">
          <Button
            colorScheme="red"
            onClick={() => {
              addNewGroup()
              onClose()
            }
            }
          >
            Add
          </Button>
        </ButtonGroup>
      </PopoverFooter>
    </PopoverContent>
  </Popover>
              
  );
}

export default AddGroup;
