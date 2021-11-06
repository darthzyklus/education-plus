import NextLink from "next/link";
import { withSSRContext } from "aws-amplify";
import type { NextPage, GetServerSideProps } from "next";
import { Flex, Box, Link, List, ListItem } from "@chakra-ui/react";

import { Course, Lesson } from "types";
import { getLesson, getCourse } from "src/graphql/queries";
import { sortByDate } from "src/utils";

type LessonProps = {
  course: Course;
  lesson: Lesson;
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const SSR = withSSRContext({ req });
  let response = await SSR.API.graphql({
    query: getLesson,
    variables: { id: query.lessonId },
  });

  const lesson = response.data.getLesson;
  const { courseID } = lesson;

  response = await SSR.API.graphql({
    query: getCourse,
    variables: { id: courseID },
  });

  const course = response.data.getCourse;
  return {
    props: { lesson, course },
  };
};

const LessonPage: NextPage<LessonProps> = ({ course, lesson }) => {
  const lessons = (course.lessons.items || []).sort(sortByDate);
  const showLessons = lessons.length > 0;

  const currentLessonIndex = lessons.findIndex((l) => l.id === lesson.id);

  const isFirstLesson = currentLessonIndex === 0;
  const isLastLesson = currentLessonIndex === lessons.length - 1;

  return (
    <Flex minHeight="90vh">
      <Box
        maxWidth="300px"
        width="100%"
        bg="gray.900"
        boxShadow="0px -2px -4px rgba(0, 0, 0, 0.5);"
      >
        <Flex
          p={4}
          borderBottom="1px solid"
          borderColor="gray.600"
          h="80px"
          alignItems="center"
          fontSize="xl"
        >
          <NextLink
            href={`/courses/${course.id}/lessons/${lesson.id}`}
            passHref
          >
            <Link _hover={{ textDecoration: "none", color: "yellow.300" }}>
              {course.name}
            </Link>
          </NextLink>
        </Flex>
        {showLessons && (
          <List>
            {lessons.map((courseLesson) => (
              <ListItem key={courseLesson.id}>
                <NextLink
                  href={`/courses/${course.id}/lessons/${courseLesson.id}`}
                  passHref
                >
                  <Link _hover={{ textDecoration: "none" }}>
                    <Box
                      p="2"
                      borderColor="gray.700"
                      borderBottomWidth="1px"
                      bg={courseLesson.id === lesson.id ? "gray.700" : "none"}
                      _hover={{
                        bg:
                          courseLesson.id === lesson.id
                            ? "gray.700"
                            : "yellow.400",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      {courseLesson.title}
                    </Box>
                  </Link>
                </NextLink>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <Box width="100%">
        <Box
          as="video"
          src={lesson.videoURL}
          controls
          width="100%"
          maxWidth="800px"
          margin="10px auto"
        >
          <p>
            Your browser doest not support HTML5 video. Here is a{" "}
            <a href={lesson.videoURL}>link to the video</a> instead.
          </p>
        </Box>
        <Box textAlign="center">
          {!isFirstLesson && (
            <NextLink
              href={`/courses/${course.id}/lessons/${
                lessons[currentLessonIndex - 1].id
              }`}
              passHref
            >
              <Link m="2">Previous</Link>
            </NextLink>
          )}
          {!isFirstLesson && !isLastLesson && <span>-</span>}
          {!isLastLesson && (
            <NextLink
              href={`/courses/${course.id}/lessons/${
                lessons[currentLessonIndex + 1].id
              }`}
              passHref
            >
              <Link m="2">Continue</Link>
            </NextLink>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default LessonPage;
