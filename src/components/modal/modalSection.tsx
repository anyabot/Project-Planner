import React, { useEffect, useState } from 'react';
import styles from "@/styles/custom.module.css"
import { ReactNode } from 'react';
import {
  Box,
  Text
} from '@chakra-ui/react'
interface Props {
  icon: string,
  header: string,
  children: ReactNode
}
import { useAppSelector, useAppDispatch } from '@/hooks';
import { selectModal, selectGroups, setModal, closeModal } from "@/store/stateSlice";
import { QuestionOutlineIcon, HamburgerIcon, Icon } from '@chakra-ui/icons'
const iconSwitch = (icon: string) => {
  switch (icon) {
    case 'hamburger': return <HamburgerIcon  position="absolute" left="-30px" top="8px" boxSize="25px"/>
    case 'tag': return <Icon position="absolute" left="-30px" top="8px" boxSize="25px" as={HiTag}/>
    case 'check': return <Icon position="absolute" left="-30px" top="8px" boxSize="25px" as={HiOutlineCheckCircle}/>
    default: return <QuestionOutlineIcon position="absolute" left="-30px" top="8px" boxSize="25px"/>
  }
}
import { HiTag, HiOutlineCheckCircle } from "react-icons/hi";


export default function modalSection({icon, header, children}: Props) {
  const dispatch = useAppDispatch();
  const indexes = useAppSelector(selectModal);
  const state = useAppSelector(selectGroups)
  const task = indexes ? state[indexes[0]].tasks[indexes[1]] : null
  const Icon = iconSwitch(icon)
  return (
    <Box mb="24px" ml="30px" position="relative">
      {Icon}
      <Text fontSize="20px" p="4px" mb="8px">{header}</Text>
      {children}
    </Box>
  );
}