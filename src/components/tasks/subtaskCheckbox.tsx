import React, { useEffect, useState } from "react";
interface Props {
  groupInd: number;
  taskInd: number;
  ind: number
}
import {
  Checkbox,
  Box
} from "@chakra-ui/react";

import { useAppSelector, useAppDispatch } from "@/hooks";
import {
  selectGroups,
  flipSubtask,
} from "@/store/stateSlice";
import { HiPencil } from "react-icons/hi";
import { Icon } from "@chakra-ui/icons";
export default function SubtaskCheckBox({groupInd, taskInd, ind}: Props) {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectGroups);
  const subtask = state[groupInd].tasks[taskInd].subtasks[ind]
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <Box position="relative"      _hover={{
      background: "gray.100",
    }}
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}>
    <Checkbox
      isChecked={subtask[1]}
    w="full"
      onChange={() => { dispatch(flipSubtask([groupInd, taskInd, ind]))}}
    >
      {subtask[0]}
    </Checkbox>
    {isHovering ? <Icon position="absolute" right="0" as={HiPencil} size="32px"/> : null}
    </Box>
  );
}
