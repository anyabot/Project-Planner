import { Task } from "@/interfaces/task";

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
  EditableTextarea,
  Tag,
  Input,
  useEditableControls,
  ButtonGroup,
  Tooltip,
  Stack,
  Button,
} from "@chakra-ui/react";
import SubtaskCheckBox from "../tasks/subtaskCheckbox";
import OpenInput from "../utils/openInput";
import LabelEditor from "../label/labelEditor";

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
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks";

export default function TaskModal() {
  // Redux
  const dispatch = useAppDispatch();
  const boards = useAppSelector(selectBoards);
  const task_key = useAppSelector(selectModal);
  const tasks = useAppSelector(selectTasks);
  // Must be here to avoid "Rendered more hooks than during the previous render"
  const [task, updateTask] = useState<Task | null>();
  useEffect(() => {
    task_key ? (task_key in tasks ? updateTask(tasks[task_key]) : null) : null;
  }, [tasks, task_key]);

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
      scrollBehavior="inside"
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
            <Editable
              fontSize="md"
              defaultValue={task.description}
              width="100%"
              my="5px"
              bgColor="gray.100"
              onSubmit={(e) => dispatch(updateTaskDescription([task_key, e]))}
              submitOnBlur={true}
            >
              <EditablePreview width="100%" whiteSpace="pre-wrap" />
              <EditableTextarea height="300px" />
            </Editable>
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
      </ModalContent>
    </Modal>
  ) : null;
}
