import { Task } from "@/interfaces/task";
import "easymde/dist/easymde.min.css";
import 'github-markdown-css'
import dynamic from "next/dynamic";

// Import Components 
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Editable,
  EditableInput,
  EditablePreview,
  Box,
  Tag,
  Input,
  useEditableControls,
  ButtonGroup,
  Tooltip,
  Stack,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import SubtaskCheckBox from "../tasks/subtaskCheckbox";
import OpenInput from "../utils/openInput";
import LabelEditor from "../label/labelEditor";
import PopoverDelete from "../utils/popoverDelete";
const SimpleMDE = dynamic(
	() => import("react-simplemde-editor"),
	{ ssr: false }
);
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

// Import Redux States 
import { selectModal, closeModal } from "@/store/stateSlice";
import {
  addSubTask,
  updateTaskName,
  updateTaskDescription,
} from "@/store/taskSlice";
import { selectTasks } from "@/store/taskSlice";
import { selectBoards, selectActiveBoard } from "@/store/boardSlice";
import ModalSection from "./modalSection";

// Import Icons 
import { CheckIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";

// Import Hooks 
import { useEffect, useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { useDisclosure } from "@chakra-ui/react";
import { useQuickModify } from "@/utils"

export default function TaskModal() {
  // Redux
  const dispatch = useAppDispatch();
  const boards = useAppSelector(selectBoards);
  const task_key = useAppSelector(selectModal);
  const tasks = useAppSelector(selectTasks);
  // Must be here to avoid "Rendered more hooks than during the previous render"
  const [task, updateTask] = useState<Task | null>();
  const [value, setValue] = useState("");
  useEffect(() => {
    if (task_key && task_key in tasks) {
      updateTask(tasks[task_key]) 
      setValue(tasks[task_key].description)
    }
  }, [tasks, task_key]);

  const { onOpen, onClose, isOpen } = useDisclosure();
  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    };
  }, []);
  const { deleteTask } = useQuickModify()

  const activeBoard = useAppSelector(selectActiveBoard);
  if (!activeBoard) return null;
  const board = boards[activeBoard];
  const tags = board.tags;
  if (!activeBoard || !(activeBoard in boards)) return null;



  function doShow() {
    return task ? true : false;
  }
  function hide() {
    updateTask(null)
    dispatch(closeModal());
  }

  function updateDescription() {
    task_key ? dispatch(updateTaskDescription([task_key, value])) : null
  }

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup size="sm" spacing={2} mt={2}>
        <Button {...getSubmitButtonProps()}>
          <CheckIcon />
        </Button>
        <Button {...getCancelButtonProps()}>
          <CloseIcon />
        </Button>
      </ButtonGroup>
    ) : null;
  }
  if (!task) return null
  return task && task_key ? (
    <Modal
      isOpen={doShow()}
      onClose={hide}
      aria-labelledby="contained-modal-title-vcenter"
      scrollBehavior="outside"
    >
      <ModalOverlay />
      <ModalContent
        maxW={[
          "container.sm",
          "container.sm",
          "container.md",
          "container.md",
          "container.md",
        ]}
      >
        <ModalHeader p={4}>
          <ModalCloseButton />
          <Editable
            defaultValue={task.name || ""}
            isPreviewFocusable={true}
            selectAllOnFocus={false}
            onSubmit={(e) => dispatch(updateTaskName([task_key, e]))}
          >
            <Tooltip label="Click to edit" shouldWrapChildren={true}>
              <EditablePreview
                py={2}
                px={4}
                _hover={{
                  background: "gray.100",
                }}
              />
            </Tooltip>
            <Input py={2} px={4} as={EditableInput} w="50%" />
            <EditableControls />
          </Editable>
        </ModalHeader>

        <ModalBody p={4} overflow="visible">
          
          <ModalSection icon="tag" header="Tags">
            {task.tags.map((tag) => (
              tags[tag] ? <Tag key={tag} colorScheme={tags[tag].color} px="5px" mx="5px">
                {tags[tag].name}
              </Tag> : null 
            ))}
              <LabelEditor initial_mode="switch" task={task_key}>
                <Tag colorScheme="gray" px="5px" mx="5px" cursor="pointer">
                  <AddIcon boxSize="15px"/>
                </Tag>
              </LabelEditor>
          </ModalSection>
          <ModalSection icon="hamburger" header="Description">
            {isOpen}
            {isOpen ? 
            <Box>
              <SimpleMDE value={value} onChange={(e) => setValue(e)} placeholder={"Enter Description"} options={autofocusNoSpellcheckerOptions}/>
              <Button colorScheme="green" onClick={() => {
                console.log(JSON.stringify(value))
                updateDescription();
                onClose()
              }}>Save</Button>
              </Box>
            : <Box onClick={onOpen} className='markdown-body'><ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{value || "Add Description"}</ReactMarkdown></Box>}
          

          </ModalSection>
          <ModalSection icon="check" header="Tasks">
            <Stack>
              {task.subtasks.map((subtask, index) => (
                  <SubtaskCheckBox
                    key={index}
                    task_key={task_key}
                    ind={index}
                  />
              ))}
              <OpenInput
                placeholder="Enter New Subtask"
                callback={(e) =>
                  e ? dispatch(addSubTask([task_key, e])) : null
                }
              >
                Add New Subtask
              </OpenInput>
            </Stack>
          </ModalSection>
        </ModalBody>
        <ModalFooter>
        <PopoverDelete obj="Task" deleteCallback={() => {
          deleteTask(task.parent, task_key)
          hide()
        }} deleteWarning={`Are you sure you want to delete this task?\nThis action is irrevesible!`}>
                  <Button colorScheme="red">{`Delete Task`}</Button>
                </PopoverDelete>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ) : null;
}
