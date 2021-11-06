import { FC } from "react";
import { Flex, Heading, Link, Text } from "@chakra-ui/react";

const Nav: FC = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      bg="gray.700"
      minHeight="40px"
      p="16px"
      boxShadow="0 2px 4px 0 rgba(0,0,0,.5);"
    >
      <Heading as="h1" size="md">
        <Link href="/" _hover={{ color: "yellow.300" }}>
          <Text fontWeight="bold" textTransform="uppercase">
            education plus
          </Text>
        </Link>
      </Heading>
    </Flex>
  );
};

export default Nav;
