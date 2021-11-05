import { FC } from "react";
import Head from "next/head";
import { Flex, Link } from "@chakra-ui/react";

import Nav from "./Nav";

const Layout: FC = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Education Plus</title>
        <meta name="description" content="E-learning Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        minHeight="100vh"
        bg="gray.800"
        color="gray.50"
      >
        <Nav />
        <Flex
          as="main"
          flexDir="column"
          justifyContent="flex-start"
          flexGrow={1}
          p="5"
        >
          {children}
        </Flex>
        <Flex
          as="footer"
          justifyContent="center"
          p="16px"
          color="gray.100"
          bg="gray.900"
        >
          <Link
            href="https://twitter.com/darthzyklus"
            target="_blank"
            rel="noopener noreferrer"
            _hover={{ color: "yellow.300" }}
          >
            Built by @darthzyklus
          </Link>
        </Flex>
      </Flex>
    </div>
  );
};

export default Layout;
