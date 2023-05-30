
import { useState } from 'react';
import { CloseIcon, HamburgerIcon, DragHandleIcon } from '@chakra-ui/icons'
import { Box, Flex, VStack, Text  } from "@chakra-ui/react";
import NavContent from './navcontent';

function RightBar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Box  h="auto" w="100px" minW="100px"
    py={4}
    px={1}
    bg="blackAlpha.900">
    <VStack h="auto"
      color="gray"
    >
                <DragHandleIcon boxSize="30px" p="2"/>
                <DragHandleIcon boxSize="30px" p="2"/>
                <DragHandleIcon boxSize="30px" p="2"/>
                <DragHandleIcon boxSize="30px" p="2"/>
                <Text>Placeholder</Text>
    </VStack >
    </Box>
  )
}

export default RightBar