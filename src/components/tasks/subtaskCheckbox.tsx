// Import Components 
import { Checkbox, Box } from "@chakra-ui/react";

// Import Redux State 
import { selectTasks, flipSubtask } from "@/store/taskSlice";

// Import Hooks
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks";

// Import Icons 
import { HiPencil } from "react-icons/hi";
import { Icon } from "@chakra-ui/icons";

// TS type for prop
interface Props {
  task_key: string;
  ind: number;
}

export default function SubtaskCheckBox({ task_key, ind }: Props) {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectTasks);
  const subtask = state[task_key].subtasks[ind];
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return subtask && (
    <Box
      position="relative"
      _hover={{
        background: "gray.100",
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Checkbox
        isChecked={subtask[1]}
        w="full"
        onChange={() => {
          dispatch(flipSubtask([task_key, ind]));
        }}
      >
        {subtask[0]}
      </Checkbox>
      {isHovering ? (
        <Icon position="absolute" right="0" as={HiPencil} size="32px" />
      ) : null}
    </Box>
  );
}
