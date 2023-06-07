//Import Components
import {
  Box,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverFooter,
  PopoverBody,
  PopoverCloseButton,
  PopoverHeader,
  Checkbox,
  ButtonGroup,
  Tooltip,
} from "@chakra-ui/react";
import Checker from "../utils/checker";

// Import Icons
import { Icon } from "@chakra-ui/icons";
import { HiPencil } from "react-icons/hi";

// Import Redux State
import { selectActiveBoard, selectBoards } from "@/store/boardSlice";

// Import Hooks
import { useAppSelector } from "@/hooks";

// TS type for prop
interface Props {
  key_list: string[]
  callback: (e: string) => void;
  changeMode: () => void;
  changeEditing: (e: string) => void;
}

function LabelFilter({ key_list, changeMode, changeEditing, callback }: Props) {
  // Redux
  const activeBoard = useAppSelector(selectActiveBoard);
  const boards = useAppSelector(selectBoards);

  // Must be here to avoid "Rendered more hooks than during the previous render"
  if (!activeBoard) return null;

  const tags = boards[activeBoard].tags;
  const tags_key = Object.keys(tags);
  return (
    <PopoverContent color="black">
      <PopoverArrow />
      <PopoverHeader fontWeight="semibold">Filter Tag</PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
        {tags_key.map((tag) => (
          <Box
            key={tag}
            position="relative"
            display="flex"
            width="full"
            textAlign="center"
          >
            <Checker
              checked={key_list.includes(tag)}
              callback={() => {
                callback(tag)
              }}
              color={tags[tag].color}
            >
              <Box maxW="200px" className="clipText" lineHeight="normal">{tags[tag].name}</Box>
            </Checker>
            <Box flex="initial">
              <Tooltip label="Edit Tag">
                <Box>
                <Icon
                  as={HiPencil}
                  boxSize="20px"
                  m={1}
                  cursor="pointer"
                  onClick={() => changeEditing(tag)}
                />
                </Box>
              </Tooltip>
            </Box>
          </Box>
        ))}
      </PopoverBody>
      <PopoverFooter display="flex" justifyContent="flex-end">
        <ButtonGroup size="sm">
          <Button colorScheme="red" onClick={() => changeMode()}>
            Create New Tag
          </Button>
        </ButtonGroup>
      </PopoverFooter>
    </PopoverContent>
  );
}

export default LabelFilter;
