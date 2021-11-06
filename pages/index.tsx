import { withSSRContext } from "aws-amplify";
import type { NextPage, GetServerSideProps } from "next";
import { Course } from "../types";
import { listCourses } from "../src/graphql/queries";
import Courses from "../components/Courses";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const SSR = withSSRContext({ req });
  const response = await SSR.API.graphql({ query: listCourses });

  return {
    props: {
      courses: response.data.listCourses.items,
    },
  };
};

type HomePageProps = {
  courses: Course[];
};

const HomePage: NextPage<HomePageProps> = ({ courses = [] }) => {
  return <Courses courses={courses} />;
};

export default HomePage;
