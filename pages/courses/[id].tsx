import NextLink from "next/link";
import { withSSRContext } from "aws-amplify";
import type { NextPage, GetServerSideProps } from "next";
import { Box, Flex, Heading, List, ListItem, Link } from "@chakra-ui/react";
import { Course, Lesson } from "../../types";
import { getCourse } from "../../src/graphql/queries";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const SSR = withSSRContext({ req });
  const response = await SSR.API.graphql({
    query: getCourse,
    variables: { id: query.id },
  });

  return {
    props: {
      course: response.data.getCourse,
    },
  };
};

type CoursePageProps = {
  course: Course;
};

const sortByDate = (a: Lesson, b: Lesson) => {
  const d1 = new Date(a.createdAt);
  const d2 = new Date(b.createdAt);

  const t1 = d1.getTime();
  const t2 = d2.getTime();

  return t1 - t2;
};

const CoursePage: NextPage<CoursePageProps> = ({ course }) => {
  const lessons = (course.lessons.items || []).sort(sortByDate);
  const showLessons = lessons.length > 0;

  return (
    <>
      <Flex
        minHeight="270px"
        alignItems="center"
        justifyContent="center"
        bg="gray.900"
        mb="4"
      >
        <Heading as="h2">{course.name}</Heading>
      </Flex>
      {showLessons && (
        <List m="0 auto" width="100%" maxWidth="700px">
          {lessons.map((lesson) => (
            <ListItem key={lesson.id}>
              <NextLink
                href={`/courses/${course.id}/lessons/${lesson.id}`}
                passHref
              >
                <Link _hover={{ textDecoration: "none" }}>
                  <Box
                    p="2"
                    borderColor="gray.600"
                    borderWidth="1px"
                    _hover={{
                      bg: "yellow.400",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    {lesson.title}
                  </Box>
                </Link>
              </NextLink>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default CoursePage;
