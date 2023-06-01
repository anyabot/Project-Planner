import React, { useEffect, useState } from "react";
import styles from "@/styles/custom.module.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  Divider,
  SimpleGrid,
  GridItem,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Tag,
  Checkbox,
  Box,
  useColorModeValue,
  IconButton,
  Input,
  useDisclosure,
  useEditableControls,
  ButtonGroup,
  SlideFade,
  Tooltip,
  Stack,
  Button
} from "@chakra-ui/react";

import { useAppSelector, useAppDispatch } from "@/hooks";
import {
  selectModal,
  selectGroups,
  setModal,
  closeModal,
  selectTags,
  addSubTask,
  updateTaskName,
  updateTaskDescription,
} from "@/store/stateSlice";
import ModalSection from "./modalSection";
import { CheckIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";

import SubtaskCheckBox from "../tasks/subtaskCheckbox";
import OpenInput from "../utils/openInput";

export default function TaskModal() {
  const dispatch = useAppDispatch();
  const indexes = useAppSelector(selectModal);
  const state = useAppSelector(selectGroups);
  const task = indexes ? state[indexes[0]].tasks[indexes[1]] : null;
  const tags = useAppSelector(selectTags);

  function doShow() {
    return task ? true : false;
  }
  function hide() {
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
        <Button {...getSubmitButtonProps()}><CheckIcon /></Button>
        <Button
          {...getCancelButtonProps()}
        ><CloseIcon /></Button>
      </ButtonGroup>
    ) : null;
  }

  return (
    task && (
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
              defaultValue={task.name}
              isPreviewFocusable={true}
              selectAllOnFocus={false}
              onSubmit={(e) =>
                indexes
                  ? dispatch(updateTaskName([indexes[0], indexes[1], e]))
                  : null
              }
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

          <ModalBody p={4}>
            <ModalSection icon="tag" header="Tag">
              {task.tags.map((tag) => (
                <Tag colorScheme={tags[tag].color} px="5px" mx="5px">
                  {tags[tag].name}
                </Tag>
              ))}
            </ModalSection>
            <ModalSection icon="hamburger" header="Description">
              <Editable
                fontSize="md"
                defaultValue={task.description}
                width="100%"
                my="5px"
                bgColor="gray.100"
                onSubmit={(e) =>
                  indexes
                    ? dispatch(
                        updateTaskDescription([indexes[0], indexes[1], e])
                      )
                    : null
                }
                submitOnBlur={true}
              >
                <EditablePreview width="100%" whiteSpace="pre-wrap" />
                <EditableTextarea height="300px" />
              </Editable>
            </ModalSection>
            <ModalSection icon="check" header="Tasks">
              <Stack>
                {task.subtasks.map((subtask, index) =>
                  indexes ? (
                    <SubtaskCheckBox
                      key={index}
                      groupInd={indexes[0]}
                      taskInd={indexes[1]}
                      ind={index}
                    />
                  ) : null
                )}
                <OpenInput placeholder="Enter New Subtask" callback={(e) => e ? indexes ? dispatch(addSubTask([indexes[0], indexes[1], e])) : null : null}>Add New Subtask</OpenInput>
              </Stack>
            </ModalSection>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  );
}
