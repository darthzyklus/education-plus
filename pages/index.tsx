import { Amplify, withSSRContext } from "aws-amplify";
import type { NextPage, GetServerSideProps } from "next";

import { Course } from "../types";

import { listCourses } from "../src/graphql/queries";
import awsExports from "../src/aws-exports";

import Layout from "../components/Layout";
import Courses from "../components/Courses";

Amplify.configure({ ...awsExports, ssr: true });

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const SSR = withSSRContext({ req });
  const response = await SSR.API.graphql({ query: listCourses });

  return {
    props: {
      courses: response.data.listCourses.items,
    },
  };
};

type HomeProps = {
  courses: Course[];
};

const Home: NextPage<HomeProps> = ({ courses = [] }) => {
  return (
    <Layout>
      <Courses courses={courses} />
    </Layout>
  );
};

export default Home;
