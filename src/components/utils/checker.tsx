import { ReactNode } from "react";

//Import Components
import { Box } from "@chakra-ui/react";

//Import Icons
import { CheckIcon } from "@chakra-ui/icons";

// TS type for prop
interface Props {
  checked: boolean;
  callback?: () => void;
  children: ReactNode;
  color?: string
}

function Checker({ checked, callback, children, color }: Props) {
  return (
    <Box
      display="flex"
      alignItems="center"
      p="2"
      w="100%"
      cursor="pointer"
      background={color + ".200" || "white"}
      _hover={{
        background: color + ".300" || "gray.100",
      }}
      onClick={callback}
    >
      {children}
      {checked ? <CheckIcon boxSize="12px" marginLeft="auto" /> : null}
    </Box>
  );
}

export default Checker;
