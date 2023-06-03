//Import Components
import {
  Flex,
  Box,
  Circle,
  Spacer,
} from "@chakra-ui/react";

// TS type for prop
interface Props {
  active: string
  callback: (a: string) => void;
}

const colorList = [
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "gray",
];

export default function ColorPicker({ active, callback }: Props) {

  return (
    <Flex
    flexDirection="row"
    width="100%"
    justifyContent="space-between"
    alignItems="center"
  >
    {colorList.map((color, index) => (
      <Box key={`${color}-${index}`}>
        <Circle
          
          bg={color}
          cursor="pointer"
          size={active == color ? "25px" : "15px"}
          onClick={() => callback(color)}
        />
        <Spacer />
      </Box>
    ))}
  </Flex>
  )
}
