//Import Components
import {
  Tag
} from "@chakra-ui/react";

// TS type for prop
interface Props {
  date: number
}

function DateBadge({
  date,
}: Props) {
  const real_date = new Date(date)
  return (
    <Tag
    colorScheme="gray"
    px="5px"
    mx="5px"
    cursor="pointer"
    size="lg"
    justifyContent="center"
    w="fit-content"
  >
    {real_date.toLocaleDateString("en-US")}
  </Tag>
  );
}

export default DateBadge;
