import { ReactNode } from "react";
import { Box, Text } from "@chakra-ui/react";

import { QuestionOutlineIcon, HamburgerIcon, Icon, ChatIcon } from "@chakra-ui/icons";
import { HiTag, HiOutlineCheckCircle } from "react-icons/hi";

const iconSwitch = (icon: string) => {
  switch (icon) {
    case "hamburger":
      return (
        <HamburgerIcon
          position="absolute"
          left="-30px"
          top="8px"
          boxSize="25px"
        />
      );
    case "tag":
      return (
        <Icon
          position="absolute"
          left="-30px"
          top="8px"
          boxSize="25px"
          as={HiTag}
        />
      );
    case "check":
      return (
        <Icon
          position="absolute"
          left="-30px"
          top="8px"
          boxSize="25px"
          as={HiOutlineCheckCircle}
        />
      );
      case "comment":
        return (
          <ChatIcon
            position="absolute"
            left="-30px"
            top="8px"
            boxSize="25px"
          />
        );
    default:
      return (
        <QuestionOutlineIcon
          position="absolute"
          left="-30px"
          top="8px"
          boxSize="25px"
        />
      );
  }
};

interface Props {
  icon: string;
  header: string;
  children: ReactNode;
}

export default function modalSection({ icon, header, children }: Props) {
  const Icon = iconSwitch(icon);
  return (
    <Box mb="24px" ml="30px" position="relative">
      {Icon}
      <Text fontSize="20px" p="4px" mb="8px">
        {header}
      </Text>
      {children}
    </Box>
  );
}
