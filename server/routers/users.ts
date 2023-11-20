import { t } from "../trpc";

const userProcedure = t.procedure.input((v) => {
  if (typeof v === "string") return v;

  throw new Error("Invalid input: Expected a string");
});

export const userRouter = t.router({
  getUser: userProcedure.query(() => ({ id: 1, name: "Kyle" })),
});
