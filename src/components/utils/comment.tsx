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
  Text,
  Heading,
} from '@chakra-ui/react'

import { useAppSelector, useAppDispatch } from '@/hooks';
import { selectModel, setModel, closeModel } from "@/store/stateSlice";
import { ChatIcon } from "@chakra-ui/icons";

interface Props {
  time: string;
  name: string;
  action: string;
}

export default function Comment({ time, name, action }: Props) {
  const dispatch = useAppDispatch();
  const model = useAppSelector(selectModel);
  
  return (
    <Box display="flex" flexDirection="row" px="15px">
      <Box mr="10px">
    <Circle size="32px"><Image src='https://lh6.googleusercontent.com/-1CyMYMxNr-g/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck1x-iJl746eYByDR1z8w0ODv0MWA/s96-c/photo.jpg' alt="Avatar"/></Circle>
    </Box>
    <Box width="100%">
      <Box display="flex" flexDirection="row">
      <Box display="flex" flexDirection="column">
        <Heading fontSize="md">{time}</Heading>
        <Text fontSize="sm">{`${name} ${action}`}</Text>
      </Box>
      <Box marginLeft="auto">
        <ChatIcon boxSize="15px"/>
      </Box>
      </Box>

    </Box>
    </Box>
  );
}