import { ReactNode } from "react";

import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";

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
import Calendar from "react-calendar";

// Import Hooks
import { useState, useCallback } from "react";
import { useDisclosure } from "@chakra-ui/react";

// TS type for prop
interface Props {
  children?: ReactNode;
  initial?: Date | null;
  editCallback?: (e: Date) => void;
  deleteCallback?: () => void;
  deleteWarning?: string;
  label: string;
}

function PopoverDatePicker({
  children,
  initial,
  editCallback,
  deleteCallback,
  deleteWarning,
  label,
}: Props) {
  const [date, setDate] = useState<Date | null>(initial || new Date());
  const { onOpen, onClose, isOpen } = useDisclosure();

  const edit = useCallback(() => {
    date && editCallback ? editCallback(date) : null;
    onClose();
  }, [editCallback]);
  const deleteObj = useCallback(() => {
    deleteCallback ? deleteCallback() : null;
    onClose();
  }, [deleteCallback]);
  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Box onClick={onOpen}>
          <Tooltip label={`Edit ${label}`}>{children}</Tooltip>
        </Box>
      </PopoverTrigger>
      <Portal>
        <PopoverContent color="black">
          <PopoverArrow />
          <PopoverHeader fontWeight="semibold">{`Edit ${label}`}</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Calendar value={date} onClickDay={setDate} className="calendar-noborder"/>
          </PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={deleteObj}
              >{`Remove`}</Button>

              <Button colorScheme="blue" onClick={edit}>
                Save
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default PopoverDatePicker;
