import { t } from "../trpc";
import { z } from "zod";

const userProcedure = t.procedure.input(z.string());

export const userRouter = t.router({
  getUser: userProcedure.query(() => ({ id: 1, name: "Kyle" })),
});
