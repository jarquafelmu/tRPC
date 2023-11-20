import { t } from "../trpc";
import { userRouter } from "./users";

// A router is a way to describe your API endpoints

export const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return "hi";
  }),
  log: t.procedure
    .input((v) => {
      if (typeof v === "string") return v;

      throw new Error("Invalid input: Expected a string");
    })
    .mutation((req) => {
      console.log(`Client says: ${req.input}`);
      return true;
    }),
  // Add the user router to the app router
  users: userRouter,
});
