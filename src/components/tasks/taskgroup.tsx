import { getDate } from "@/utils";
import { Droppable, Draggable } from "react-beautiful-dnd";

//Import Components
import { Box, Circle, Button } from "@chakra-ui/react";
import TaskGroupHeader from "./taskGroupHeader";
import TaskGroupFooter from "./taskGroupFooter";

// Import Icons
import { AddIcon } from "@chakra-ui/icons";

// Import Redux State
import {
  selectGroups,
} from "@/store/groupSlice";
import {
  selectBoards,
  selectActiveBoard,
} from "@/store/boardSlice";
import TaskCard from "./taskCard";

// Import Hooks
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { useQuickModify } from "@/utils"

// TS type for prop
interface Props {
  parent: string;
  group_key: string;
  ind: number;
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid / 2,

  // styles we need to apply on draggables
  ...draggableStyle,
});

const grid = 8;

function TaskGroup({ parent, group_key, ind }: Props) {
  // Redux
  const dispatch = useAppDispatch();
  const boards = useAppSelector(selectBoards);
  const activeBoard = useAppSelector(selectActiveBoard);
  const groups = useAppSelector(selectGroups);
  const group = groups[group_key];
  if (!activeBoard) return null;

  const [isHovering, setIsHovering] = useState(false);
  const {newTask, newGroup, newGroupAt} = useQuickModify()

  const state = boards[activeBoard].groups;

  const addGroupLeft = function () {
    newGroupAt(parent, ind)
  };
  const addGroupEnd = function () {
    newGroup(parent)
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  if (!group) return null
  return (
    <Box position="relative" height="100%">
      <Box
        w="30px"
        h="30px"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        position="absolute"
        transform="translateY(-50%) translateX(-50%)"
        left="0"
        top="30px"
      >
        {isHovering && (
          <Circle
            size="30px"
            bg="purple.700"
            color="white"
            onClick={addGroupLeft}
            _hover={{
              cursor: "pointer",
            }}
          >
            <AddIcon />
          </Circle>
        )}
      </Box>
      {ind == state.length - 1 && (
        <Box
          w="30px"
          h="30px"
          position="absolute"
          transform="translateY(-50%) translateX(50%)"
          right="-30px"
          top="30px"
        >
          <Circle
            size="30px"
            bg="gray.700"
            color="white"
            onClick={addGroupEnd}
            _hover={{
              cursor: "pointer",
            }}
          >
            <AddIcon />
          </Circle>
        </Box>
      )}
      <Box minW="320px" maxWidth="320px" height="100%">
        <Box height="100%" backgroundColor={group.color + ".300"}>
          <TaskGroupHeader group_key={group_key} />

          <Droppable droppableId={`${ind}`}>
            {(provided, snapshot) => (
              <Box
                ref={provided.innerRef}
                width="320px"
                height="calc(100% - 100px)"
                {...provided.droppableProps}
              >
                {/* Scroller for overflow */}
                <Box
                  overflowY="scroll"
                  height="-webkit-fill-available"
                  className="scroller"
                >
                  {group.tasks.map((item, index) => (
                    <Box key={item}>
                      <Draggable key={item} draggableId={item} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <TaskCard group_key={group_key} task_key={item} />
                          </div>
                        )}
                      </Draggable>
                    </Box>
                  ))}
                  {provided.placeholder}
                </Box>
              </Box>
            )}
          </Droppable>
          <TaskGroupFooter group_key={group_key}/>
        </Box>
      </Box>
    </Box>
  );
}

export default TaskGroup;
