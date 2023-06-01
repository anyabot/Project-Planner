import { Box, Stack } from "@chakra-ui/react";
import { GroupData } from "@/interfaces/task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import Image from "next/image";
interface Props {
  group: GroupData;
  ind: number;
}
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Circle,
  Text,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import HeartBeatIcon from "../../icons/heartbeat.svg";
import { useAppSelector, useAppDispatch } from "@/hooks";
import {
  selectGroups,
  setGroups,
  addItem,
  addGroup,
  addGroupLast,
  setGroupColor,
} from "@/store/stateSlice";
import TaskCard from "./taskCard";

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid / 2,

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  width: 320,
});

const grid = 8;

const colorList = [
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "gray",
];

function TaskGroup({ group, ind }: Props) {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectGroups);
  const addNewItem = function (index: number) {
    if (index < 0 || index >= state.length) return;
    dispatch(addItem(index));
  };
  const addGroupLeft = function () {
    dispatch(addGroup(ind));
  };
  const addGroupEnd = function () {
    dispatch(addGroupLast());
  };
  const setColor = function (color: string) {
    dispatch(setGroupColor([ind, color]));
  };
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
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
      <Box minW="320px" height="100%">
        <Box height="100%" backgroundColor={group.color + ".300"}>
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
          >
            <Circle size="25px" float="right" bg={group.color + ".300"} m={2}>
              {group.tasks.length}
            </Circle>
            <Editable defaultValue={group.name} width="100%" overflow="hidden">
              <EditablePreview />
              <EditableInput />
            </Editable>
            <Popover>
              <PopoverTrigger>
                <ChevronDownIcon color="white" cursor="pointer" />
              </PopoverTrigger>
              <PopoverContent color="black">
                <PopoverArrow />
                <Tabs>
                  <TabList>
                    <Tab>Appearance</Tab>
                    <Tab>Automations</Tab>
                  </TabList>
                  {/* Color Picker */}
                  <TabPanels>
                    <TabPanel>
                      <Flex
                        flexDirection="row"
                        width="100%"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {colorList.map((color) => (
                          <>
                            <Circle
                              key={color}
                              bg={color}
                              cursor="pointer"
                              size={group.color == color ? "25px" : "15px"}
                              onClick={() => setColor(color)}
                            />
                            <Spacer />
                          </>
                        ))}
                      </Flex>
                    </TabPanel>
                    <TabPanel>
                      <p>two!</p>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </PopoverContent>
            </Popover>

          </Heading>
          <Button
            bg={group.color + ".300"}
            _hover={{ bg: group.color + ".400" }}
            onClick={() => addNewItem(ind)}
            margin="auto"
            display="block"
            width="100%"
          >
            Add Item
          </Button>
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
                    <Box key={index}>
                      <Draggable
                        key={index}
                        draggableId={item.id.toString()}
                        index={index}
                      >
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
                            <TaskCard task={item} ind={index} groupInd = {ind} />
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
        </Box>
      </Box>
    </Box>
  );
}

export default TaskGroup;
