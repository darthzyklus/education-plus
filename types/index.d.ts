export type Lesson = {
  id: string;
  title: string;
  videoURL: string;
  createdAt: string;
  updatedAt: string;
};

export type Course = {
  id: string;
  name: string;
  lessons: {
    items: Lesson[];
  };
};
