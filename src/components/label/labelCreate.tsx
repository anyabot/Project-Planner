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
  Text,
  Input ,
  ButtonGroup,
} from "@chakra-ui/react";
import ColorPicker from "../utils/colorPicker";

// Import Icons
import { DeleteIcon, Icon } from "@chakra-ui/icons";
import { CgColorPicker } from "react-icons/cg";

// Import Redux State
import {
  selectGroups,
  setGroupColor,
} from "@/store/groupSlice";
import {
  selectActiveBoard,
} from "@/store/boardSlice";

// Import Hooks
import { useState } from "react";
import { useAppSelector } from "@/hooks";
import { useQuickModify } from "@/utils"

// TS type for prop
interface Props {
  onClose: () => void
}

function LabelAdd({ onClose }: Props) {
  // Redux
  const activeBoard = useAppSelector(selectActiveBoard);
  if (!activeBoard) return null;

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
              <Text fontSize="12px" mb="6px">Tag Name</Text>
            <Input placeholder='Enter Task Name' value={tagName || ""} onChange={(e => setTagName(e.target.value))}/>
            <Text fontSize="12px" mb="6px">Tag Color</Text>
            <ColorPicker active={tagColor} callback={e => setTagColor(e)}/>
            </PopoverBody>
            <PopoverFooter display="flex" justifyContent="flex-end">
              <ButtonGroup size="sm">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button colorScheme="red" onClick={() => addTag(tagName, tagColor)}>Add Task</Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
  );
}

export default LabelAdd;
