import { observable } from "@trpc/server/observable";
import { t } from "../trpc";
import { z } from "zod";
import { EventEmitter } from "ws";

const userProcedure = t.procedure.input(z.object({ userId: z.string() }));
const eventEmitter = new EventEmitter();

export const userRouter = t.router({
  get: userProcedure.query(({ input }) => ({ id: input.userId })),
  // Add an update mutation to the user router using a composite procedure
  // this will expect an input of { userId: string, name: string }
  update: userProcedure
    .input(z.object({ name: z.string() }))
    // define the contract for the returned object
    .output(z.object({ id: z.string(), name: z.string() }))
    .mutation((req) => {
      console.log(
        `Updating user ${req.input.userId} to have the name ${req.input.name}`
      );
      eventEmitter.emit("update", req.input.userId);
      return { id: req.input.userId, name: req.input.name };
    }),
  // A websocket that will send the updated user to all subscribers
  onUpdate: t.procedure.subscription(() => {
    return observable<string>((emit) => {
      // open connection to the event emitter*
      eventEmitter.on("update", emit.next);

      return () => {
        // close connection to the event emitter
        eventEmitter.off("update", emit.next);
      };
    });
  }),
});
