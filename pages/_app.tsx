import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
import Layout from "../components/Layout";

Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
export default MyApp;
