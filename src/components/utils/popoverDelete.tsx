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
  ButtonGroup,
  Text
} from "@chakra-ui/react";

// TS type for prop
interface Props {
  children: ReactNode
  obj: string;
  deleteCallback: () => void
  deleteWarning?: string
}

function PopoverDelete({ obj, deleteCallback, deleteWarning, children }: Props) {

  return (
  <Popover>
    <Box>
      <PopoverTrigger>
        {children}
      </PopoverTrigger>
    </Box>
    <PopoverContent color="black">
      <PopoverArrow />
      <PopoverHeader fontWeight="semibold">
      {`Delete ${obj}`}
      </PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody fontSize="16px" fontWeight="normal" whiteSpace="pre-line">{deleteWarning}
        
      </PopoverBody>
      <PopoverFooter display="flex" justifyContent="flex-end">
        <ButtonGroup size="sm">
          <Button
            colorScheme="red"
            onClick={deleteCallback}
          >
            Delete
          </Button>
        </ButtonGroup>
      </PopoverFooter>
    </PopoverContent>
  </Popover>
              
  );
}

export default PopoverDelete;
