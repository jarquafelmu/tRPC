import { t } from "../trpc";
import { z } from "zod";

const userProcedure = t.procedure.input(z.object({ userId: z.string() }));

export const userRouter = t.router({
  get: userProcedure.query(({ input }) => ({ id: input.userId })),
  // Add an update mutation to the user router using a composite procedure
  // this will expect an input of { userId: string, name: string }
  update: userProcedure
    .input(z.object({ name: z.string() }))
    .mutation((req) => {
      console.log(
        `Updating user ${req.input.userId} to have the name ${req.input.name}`
      );
      return { id: req.input.userId, name: req.input.name };
    }),
});
