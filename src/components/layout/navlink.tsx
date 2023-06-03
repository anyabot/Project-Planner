import { ReactNode } from "react";

//Import Components
import NextLink from 'next/link'
import { Link, Text, TextProps } from "@chakra-ui/react";

// TS type for prop
interface Props extends TextProps {
  children : ReactNode, 
  to : string
}

function NavLink ({ children, to = "/", ...rest }: Props) {
  return (
    <Link as={NextLink} href={to}>
      <Text display="block" {...rest} my={0} fontWeight="bold">
        {children}
      </Text>
    </Link>
  );
};

export default NavLink