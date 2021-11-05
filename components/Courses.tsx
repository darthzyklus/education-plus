import { FC } from "react";
import { Box, Text, List, ListItem, Flex } from "@chakra-ui/react";

import { Course } from "../types";

type CoursesProps = {
  courses: Course[];
};

const Courses: FC<CoursesProps> = ({ courses }) => {
  const showCourses = courses.length > 0;

  if (!showCourses) {
    return (
      <Text as="h3" textAlign="center">
        No courses found
      </Text>
    );
  }

  return (
    <div>
      <Text as="h2" fontSize="xl">
        Courses
      </Text>
      <List display="flex" flexWrap="wrap">
        {courses.map((course) => (
          <ListItem
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            key={course.id}
            minH="250px"
            maxWidth="250px"
            width="100%"
            bg="gray.900"
            _hover={{ color: "yellow.300", cursor: "pointer" }}
            m="5"
          >
            <Flex
              bg="black"
              minH="200px"
              w="100%"
              justifyContent="center"
              alignItems="center"
              fontSize="3xl"
              wordBreak="break-word"
              _hover={{
                color: "yellow.300",
                cursor: "pointer",
              }}
            >
              {course.name}
            </Flex>
            <Text as="h3" textAlign="center" p="4">
              {course.name}
            </Text>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Courses;
