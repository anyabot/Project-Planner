import { ReactNode } from "react";

// Import Components
import {
  Box,
  Text,
} from "@chakra-ui/react";

// TS type for prop
interface Props {
  children: ReactNode,
  text: string,
}

export default function ModalSubsection({children, text}: Props) {
  return (
    <Box className="modalSubsection">
      <Text fontWeight="semibold" fontSize="lg" mb="0">{text}</Text>
      {children}
    </Box>
              
  );
}
