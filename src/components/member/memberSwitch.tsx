import { User } from "@/interfaces/task"
import { ReactNode } from "react";

//Import Components
import {
  Box,
  Button,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverTrigger,
  PopoverBody,
  PopoverCloseButton,
  PopoverHeader,
  Checkbox,
  Avatar,
  Tooltip,
} from "@chakra-ui/react";
import Checker from "../utils/checker";

// Import Icons
import { Icon } from "@chakra-ui/icons";
import { HiPencil } from "react-icons/hi";

// Import Redux State
import { selectActiveBoard, selectBoards } from "@/store/boardSlice";
import { selectUsers } from "@/store/stateSlice";

// Import Hooks
import { useAppSelector } from "@/hooks";
import { useState, useEffect } from "react";

// TS type for prop
interface Props {
  children: ReactNode,
  key_list: string[]
  callback: (e: string) => void;
  text: string
}

function MemberSwitch({ key_list, callback, children, text }: Props) {
  // Redux
  const activeBoard = useAppSelector(selectActiveBoard);
  const boards = useAppSelector(selectBoards);
  const users = useAppSelector(selectUsers);

  // Must be here to avoid "Rendered more hooks than during the previous render"
  if (!activeBoard) return null;

  const members = boards[activeBoard].members;
  const [memberList, setMemberList] = useState<string[]>([])

  useEffect(() => {
    const temp: string[] = []
    members.forEach(member => member.id in users ? temp.push(member.id) : null)
    setMemberList(temp)
  }, [users, members])
  return (
    <Popover >
      <PopoverTrigger>
        {children}
        </PopoverTrigger>

    <PopoverContent color="black">
      <PopoverArrow />
      <PopoverHeader fontWeight="semibold">{text}</PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
        {memberList.map((member) => (
          <Box
            key={member}
            position="relative"
            display="flex"
            width="full"
            textAlign="center"
          >
            <Checker
              checked={key_list.includes(member)}
              callback={() => {
                callback(member)
              }}
            >
              <Avatar key={member} name={users[member].name} src={users[member].avatar} size="xs" mr={2}/>
              <Box className="clipText" w="230px">{users[member].name}</Box>
            </Checker>
          </Box>
        ))}
      </PopoverBody>
    </PopoverContent>
    </Popover>
  );
}

export default MemberSwitch;
