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
  Tooltip,
  Portal
} from "@chakra-ui/react";
import ColorPicker from "../utils/colorPicker";

// Import Icons
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { CgColorPicker } from "react-icons/cg";

// Import Redux State
import {
  selectGroups,
  setGroupColor,
} from "@/store/groupSlice";
import {
  selectBoards,
  selectActiveBoard,
  addTag
} from "@/store/boardSlice";

// Import Hooks
import { useState } from "react";
import { useAppSelector } from "@/hooks";
import { useQuickModify } from "@/utils"

// TS type for prop
interface Props {
  onClose: () => void,
  back: () => void,
  editing_tag?: string,
}

function LabelAdd({ back, onClose, editing_tag }: Props) {
  // Redux
  const activeBoard = useAppSelector(selectActiveBoard);
  if (!activeBoard) return null;
  const boards = useAppSelector(selectBoards);
  const board = boards[activeBoard]
  const tags = board.tags
  let tag
  if (editing_tag && (editing_tag in tags)) {
    tag = tags[editing_tag]
  } 

  const [tagName, setTagName] = useState(tag?.name || "")
  const [tagColor, setTagColor] = useState(tag?.color || "gray")

  const {newTag, deleteTag} = useQuickModify()

  const addNewTag = function (name: string, color: string) {
    name ? newTag(activeBoard, name, color) : null
    setTagName("")
    back()
  };
  const editTag = function (tag_id:string , name: string, color: string) {
    name ? addTag([activeBoard, tag_id, name, color]) : null
    setTagName("")
    back()
  };

  return (
        <PopoverContent color="black">
            <PopoverArrow />
            <PopoverHeader fontWeight="semibold"><ChevronLeftIcon cursor="pointer" onClick={back}/>{editing_tag ? "Edit Tag" : "Create Task"}</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Text fontSize="12px" mb="6px">Tag Name</Text>
            <Input placeholder='Enter Task Name' value={tagName || ""} onChange={(e => setTagName(e.target.value))}/>
            <Text fontSize="12px" mb="6px">Tag Color</Text>
            <ColorPicker active={tagColor} callback={e => setTagColor(e)}/>
            </PopoverBody>
            <PopoverFooter display="flex" justifyContent="flex-end">
              <ButtonGroup size="sm">
              {editing_tag ? 
              <Box display="contents"><Popover>
                <Box>
                  <PopoverTrigger>
                  <Button colorScheme="red">Delete Tag</Button>
                  </PopoverTrigger>
                </Box>
                <PopoverContent color="black">
                  <PopoverArrow />
                  <PopoverHeader fontWeight="semibold">Delete Tag</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    Are you sure you want to delete this tag?
                    <br />
                    It will be removed from all tasks.
                    <br />
                    This action is irrevesible!
                    <br/>
                  </PopoverBody>
                  <PopoverFooter display="flex" justifyContent="flex-end">
                    <ButtonGroup size="sm">
                      <Button colorScheme="red" onClick={() => {
                        deleteTag(editing_tag)
                        back()
                      }}>Delete</Button>
                    </ButtonGroup>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
              <Button colorScheme="blue" onClick={() => editTag(editing_tag, tagName, tagColor)}> Edit Tag</Button>
              </Box>
              : <Button colorScheme="blue" onClick={() => addNewTag(tagName, tagColor)}> {editing_tag ? "Edit Tag" : "Create Task"}</Button> }
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
  );
}

export default LabelAdd;
