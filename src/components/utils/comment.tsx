//Import Components
import {
  Box,
  Button,
  Textarea,
  FormControl,
  Avatar,
  Text,
  useOutsideClick,
} from "@chakra-ui/react";
import PopoverDelete from "./popoverDelete";
import reactTextareaAutosize from "react-textarea-autosize";

//Import Hooks
import React, { useRef, useState, useMemo } from "react";

// TS type for prop
interface Props {
  name: string;
  time: number;
  img?: string;
  content: string;
  editCallback: (e: string) => void;
  deleteCallback: () => void;
  canEdit: boolean;
}

export default function Comment({
  name,
  time,
  img,
  content,
  editCallback,
  deleteCallback,
  canEdit,
}: Props) {
  const [isEditing, setisEditing] = useState(false);
  const [message, setMessage] = useState(content || "");
  const ref = useRef(null);
  const real_time = useMemo(() => {
    return new Date(time);
  }, [time]);
  useOutsideClick({
    ref: ref,
    handler: () => {
      setisEditing(false);
    },
  });

  return (
    <Box mt="12px">
      <Avatar
        name={name}
        src={img}
        size="md"
        display="inline-block"
        m="4px"
      />
      <Box display="inline-block" ml="8px" w="calc(100% - 70px)" mb="8px">
        <Text display="inline-block" fontWeight="semibold" pr="8px" mb="0">
          {name}
        </Text>
        <Text
          display="inline-block"
          fontWeight="bold"
          fontSize="12px"
          color="gray.600"
          mb="4px"
        >
          {real_time.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) +
            " at " +
            real_time.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
        </Text>
        {
          isEditing && canEdit ? (
            <FormControl ref={ref}>
              <Textarea
                py={2}
                px={4}
                placeholder="Enter Comment"
                w="100%"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                onSubmit={() => setMessage("")}
                autoFocus={true}
                as={reactTextareaAutosize}
              />
              <Button
                colorScheme="green"
                onClick={() => {
                  editCallback(message);
                  setisEditing(false);
                }}
              >
                Save
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  setisEditing(false);
                }}
              >
                Cancel
              </Button>
            </FormControl>
          ) : (
            <Box>
              <Box
                bg="white"
                width="fit-content"
                borderRadius="0 8px 8px"
                padding="8px 12px"
                boxShadow="0 1px 2px -1px"
                maxWidth="100%"
                whiteSpace="pre-wrap"
              >
                {content}
              </Box>
              {canEdit ? <Box display="block">
                <Box
                  display="inline-block"
                  fontWeight="semibold"
                  fontSize="12px"
                  color="gray.400"
                  mb="0"
                  cursor="pointer"
                  ml={4}
                  onClick={() => {
                    setMessage(content);
                    setisEditing(true);
                  }}
                >
                  Edit
                </Box>
                <Box display="inline-block">
                  <PopoverDelete
                    obj="Comment"
                    deleteCallback={deleteCallback}
                    deleteWarning="Are you sure you want to delete this comment?"
                  >
                    <Box
                      display="inline-block"
                      fontWeight="semibold"
                      fontSize="12px"
                      color="gray.400"
                      mb="0"
                      cursor="pointer"
                      ml={4}
                    >
                      Delete
                    </Box>
                  </PopoverDelete>
                </Box>
              </Box>
              : null }
            </Box>
          )
        }
      </Box>
    </Box>
  );
}
