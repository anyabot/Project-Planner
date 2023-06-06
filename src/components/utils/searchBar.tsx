import { FormEvent } from "react";

//Import Components
import { InputGroup, Input, InputLeftElement } from "@chakra-ui/react";

//Import Hooks
import React, { useRef, useState, ReactNode } from "react";

//Import Icons
import { Search2Icon } from "@chakra-ui/icons";

// TS type for prop
interface Props {
  placeholder: string;
  callback: (a: FormEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ placeholder, callback }: Props) {
  return (
    <InputGroup
      borderRadius={5}
      borderColor="blackAlpha.500"
      size="sm"
      maxW="300px"
    >
      <InputLeftElement
        pointerEvents="none"
        children={<Search2Icon color="gray.600" />}
      />
      <Input
        type="text"
        placeholder={placeholder}
        border="1px solid"
        onChange={(e) => {
          callback(e);
        }}
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      />
    </InputGroup>
  );
}
