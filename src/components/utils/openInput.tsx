//Import Components
import {
  Box,
  Button,
  useOutsideClick,
  Input,
  FormControl,
} from "@chakra-ui/react";

//Import Hooks
import React, { useRef, useState, ReactNode } from "react";

// TS type for prop
interface Props {
  placeholder: string;
  callback: (a: string) => void;
  children: ReactNode;
}

export default function OpenInput({ placeholder, callback, children }: Props) {
  const [isEditing, setisEditing] = useState(false);
  const [message, setMessage] = useState("");
  const ref = useRef(null);
  useOutsideClick({
    ref: ref,
    handler: () => {
      setMessage("");
      setisEditing(false);
    },
  });
  return isEditing ? (
    <FormControl ref={ref}>
      <Input
        py={2}
        px={4}
        placeholder={placeholder}
        w="100%"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        onSubmit={() => setMessage("")}
        autoFocus={true}
      />
      <Button colorScheme="green"
        onClick={() => {
          callback(message);
          setMessage("");
          setisEditing(false);
        }}
      >
        Save
      </Button>
      <Button colorScheme="red"
        onClick={() => {
          setMessage("");
          setisEditing(false);
        }}
      >
        Cancel
      </Button>
    </FormControl>
  ) : (
    <Box
      _hover={{
        background: "gray.100",
      }}
      onClick={() => setisEditing(true)}
    >
      {children}
    </Box>
  );
}
