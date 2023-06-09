//Import Components
import {
  Box,
  Heading,
  Circle,
  Editable,
  EditableInput,
  EditablePreview,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Portal,
  Tooltip,
} from "@chakra-ui/react";
import ColorPicker from "../utils/colorPicker";
import PopoverDelete from "../utils/popoverDelete";

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
import { useAppSelector, useAppDispatch } from "@/hooks";
import { useQuickModify } from "@/utils"
import { useDisclosure } from "@chakra-ui/react";

// TS type for prop
interface Props {
  group_key: string;
}

function TaskGroupHeader({ group_key }: Props) {
  // Redux
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(selectActiveBoard);
  const groups = useAppSelector(selectGroups);
  const group = groups[group_key];
  if (!activeBoard) return null;

  const {deleteGroup} = useQuickModify()

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const setColor = function (color: string) {
    dispatch(setGroupColor([group_key, color]));
  };

  return (
    <Heading
      size="md"
      flexDirection="row"
      display="flex"
      color="white"
      backgroundColor={group.color + ".400"}
      height="60px"
      p={2}
      alignItems="center"
      m={0}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Circle size="25px" float="right" bg={group.color + ".300"} m={2}>
        {group.tasks.length}
      </Circle>
      <Editable
        defaultValue={group.name}
        width="100%"
        className="clipText"
      >
        <Tooltip label="Click to edit" shouldWrapChildren={true}>
          <EditablePreview />
        </Tooltip>
        <EditableInput />
      </Editable>

      <Popover>
        <Tooltip label="Color Picker">
          <Box visibility={isHovering ? "visible" : "hidden"}>
            <PopoverTrigger>
              <Box>
                <Icon
                  as={CgColorPicker}
                  color="white"
                  cursor="pointer"
                  boxSize="20px"
                  m={2}
                  _hover={{ color: "gray.100" }}
                />
              </Box>
            </PopoverTrigger>
          </Box>
        </Tooltip>
        <Portal>
          <PopoverContent color="black">
            <PopoverArrow />
            <Box m={4}>
              <ColorPicker active={group.color} callback={setColor} />
            </Box>
          </PopoverContent>
        </Portal>
      </Popover>
      <PopoverDelete obj="Group" deleteCallback={() => deleteGroup(activeBoard, group_key)} deleteWarning={`Are you sure you want to delete this group?\nThis action is irrevesible!`}>

          <Box visibility={isHovering ? "visible" : "hidden"}>
          <Tooltip label="Delete Group">
              <DeleteIcon
                color="white"
                cursor="pointer"
                boxSize="20px"
                m={2}
                _hover={{ color: "gray.100" }}
              />
        </Tooltip>
          </Box>
      </PopoverDelete>
    </Heading>
  );
}

export default TaskGroupHeader;
