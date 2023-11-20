import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "./context";

// Create a new TRPC router only once
export const t = initTRPC.context<Context>().create();

const isAdminMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.isAdmin) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action",
    });
  }

  // override the context with the user
  return next({ ctx: { user: { id: 1 } } });
  // return next();
});

// create routes that are only available to admins
export const adminProcedure = t.procedure.use(isAdminMiddleware);
