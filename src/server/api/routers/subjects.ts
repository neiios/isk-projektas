import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const subjects = [
  {
    id: "1",
    name: "Mathematics",
  },
  {
    id: "2",
    name: "English",
  },
  {
    id: "3",
    name: "Physics",
  },
  {
    id: "4",
    name: "Chemistry",
  },
  {
    id: "5",
    name: "Biology",
  },
  {
    id: "6",
    name: "History",
  },
  {
    id: "7",
    name: "Geography",
  },
  {
    id: "8",
    name: "Economics",
  },
  {
    id: "9",
    name: "Computer Science",
  },
  {
    id: "10",
    name: "Art",
  },
];

export const subjectsRouter = createTRPCRouter({
  getSubjects: publicProcedure.query(() => {
    return subjects;
  }),
});
