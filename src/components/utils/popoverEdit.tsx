import { ReactNode } from "react";

//Import Components
import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverFooter,
  PopoverBody,
  PopoverCloseButton,
  PopoverHeader,
  Text,
  Input,
  ButtonGroup,
  Tooltip,
  Portal,
} from "@chakra-ui/react";
import PopoverDelete from "./popoverDelete";

// Import Hooks
import { useState, useCallback } from "react";
import { useDisclosure } from "@chakra-ui/react";

// TS type for prop
interface Props {
  mode: "edit" | "create"
  children?: ReactNode;
  obj: string;
  initial?: string;
  createCallback?: (e: string) => void
  editCallback?: (e:string) => void
  deleteCallback?: () => void
  deleteWarning?: string
}

function PopoverEdit({ mode, obj, children, initial, createCallback, editCallback, deleteCallback, deleteWarning }: Props) {
  const [name, setName] = useState(initial || "");
  const { onOpen, onClose, isOpen } = useDisclosure();

  const edit = useCallback(() =>  {
    name && editCallback ? editCallback(name) : null
    onClose()
  }, [editCallback]);
  const create = useCallback(() =>  {
    name && createCallback ? createCallback(name) : null
    onClose()
  }, [createCallback]);
  const deleteObj = useCallback(() =>  {
    deleteCallback ? deleteCallback() : null
    onClose()
  }, [deleteCallback]);
  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Box                     onClick={onOpen}>
        <Tooltip label={mode == "edit" ? `Edit ${obj}` : `Create ${obj}`}>
          {children}
        </Tooltip>
        </Box>
      </PopoverTrigger>
      <Portal>
        <PopoverContent color="black">
          <PopoverArrow />
          <PopoverHeader fontWeight="semibold">
          {mode == "edit" ? `Edit ${obj}` : `Create ${obj}`}
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Text fontSize="12px" mb="6px">
            {`${obj} Name`}
            </Text>
            <Input
              placeholder={`Enter ${obj} Name`}
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />
          </PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            {mode == "edit" ? (
                <PopoverDelete obj={obj} deleteCallback={deleteObj} deleteWarning={deleteWarning}>
                  <Button colorScheme="red">{`Delete ${obj}`}</Button>
                </PopoverDelete>
              ) : null}
              {mode == "edit" ? (
                <Button
                  colorScheme="blue"
                  onClick={edit}
                >
                  Edit Name
                </Button>
              ) : (
                <Button
                  colorScheme="blue"
                  onClick={create}
                >
                  {`Create ${obj}`}
                </Button>
              )}
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default PopoverEdit;
