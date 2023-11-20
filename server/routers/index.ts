import { t } from "../trpc";
import { userRouter } from "./users";

const appRouter = t.router({
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
});

export const mergedRouter = t.mergeRouters(appRouter, userRouter);
