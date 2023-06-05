import { ReactNode, useEffect, useState, useCallback } from "react";

//Import Components
import {
  Popover,
  PopoverTrigger,
} from "@chakra-ui/react";
import LabelCreate from "./labelCreate";
import LabelSwitch from "./labelSwitch";

// Import Redux State
import {
  selectActiveBoard,
} from "@/store/boardSlice";

// Import Hooks
import { useAppSelector } from "@/hooks";
import { useDisclosure } from "@chakra-ui/react"

// TS type for prop
interface Props {
  children: ReactNode,
  initial_mode: string,
  task?: string
}

function LabelEditor({ initial_mode, task, children }: Props) {
  // Redux
  const activeBoard = useAppSelector(selectActiveBoard);
  if (!activeBoard) return null;
  const [mode, setMode] = useState("")
  const [editing_tag, setEditing] = useState("")
  useEffect(() => setMode(initial_mode), [])

  const { onOpen, onClose, isOpen } = useDisclosure()

  const back = useCallback(() => {
    setMode(initial_mode)
    setEditing("")
  }, [initial_mode])
  const changeMode = useCallback(() => {setMode("create")}, [])
  const changeEditing = useCallback((e: string) => 
    {
      setEditing(e)
      setMode("modify")
  }, [])

  function modeSwitch(mode: string) {
    switch (mode) {
      case "create": {
        console.log("create mode")
        return <LabelCreate onClose={onClose} back={back}/>
      }
      case "modify": {
        console.log("create mode")
        return <LabelCreate onClose={onClose} back={back} editing_tag={editing_tag}/>
      }
      case "switch": {
        console.log("create mode")
        return task ? <LabelSwitch task_key={task} onClose={onClose} changeMode={changeMode} changeEditing={changeEditing}/> : null
      }
    }
  }

  return (
      <Popover 
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}>
        <PopoverTrigger>
          {children}
          </PopoverTrigger>
        {modeSwitch(mode)}
      </Popover>
  );
}

export default LabelEditor;
