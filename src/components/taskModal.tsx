import React, { useEffect, useState } from 'react';
import styles from "@/styles/custom.module.css"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Select,
  Grid,
  Image,
  Box,
  Divider,
  Circle,
  SimpleGrid,
  GridItem,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/react'
import Comment from './utils/comment';

import { useAppSelector, useAppDispatch } from '@/hooks';
import { selectModel, setModel, closeModel } from "@/store/stateSlice";



export default function TaskModal() {
  const dispatch = useAppDispatch();
  const model = useAppSelector(selectModel);

  function doShow() {
    return model? true : false
  }
  function hide() {
    dispatch(closeModel())
  }
  
  return (
    model && <Modal isOpen={doShow()} onClose={hide} aria-labelledby="contained-modal-title-vcenter" scrollBehavior="inside">
      <ModalOverlay />
          <ModalContent maxW={["container.sm", "container.sm", "container.md", "container.lg", "container.lg"]}>
            <ModalHeader>{model!.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody p={0}>
              <Divider m={0}/>
              <SimpleGrid columns={3}>
                <GridItem display="flex"  colSpan={2} flexDirection="column">
                  <Editable fontSize="xl" defaultValue={"Test"} width="100%" mt="5px">
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                  <Editable fontSize="lg" defaultValue={"Test2"} width="100%" mt="5px">
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                  <Editable fontSize="sm" defaultValue={"Test3"} width="100%" mt="5px">
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                  <Divider />
                  <Comment time="an hour ago" name="Tai" action="Said"/>
                  <Comment time="3 hours ago" name="Tai" action="Posted"/>
                  <Comment time="3 hours ago" name="Tai" action="Deleted"/>
                  <Comment time="5 hours ago" name="Tai" action="Created"/>
                </GridItem>
                <GridItem display="flex" justifyContent="center" flexDirection="column" bg="gray.300">
                  <Box p="20px">Due Date</Box>
                  <Box p="20px">Not Scheduled</Box>
                  <Box p="20px">Tags</Box>
                  <Box p="20px">Watching</Box>
                </GridItem>
              </SimpleGrid>
            </ModalBody>
          </ModalContent>
          
    </Modal>
  );
}