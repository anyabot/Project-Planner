
//Import Components
import { Flex } from "@chakra-ui/react";
import NavContent from './navcontent';

function CommonNavbar() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      bg="blackAlpha.900"
      color="gray"
    >
      <NavContent />
    </Flex>
  )
}

export default CommonNavbar