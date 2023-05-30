
import { useState } from 'react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Box, Flex } from "@chakra-ui/react";
import NavContent from './navcontent';

function CommonNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      py={4}
      px={1}
      bg="blackAlpha.900"
      color="gray"
    >
      <NavContent />
    </Flex>
  )
}

export default CommonNavbar