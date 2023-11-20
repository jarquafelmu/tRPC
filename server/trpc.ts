import { initTRPC } from "@trpc/server";
import { Context } from "./context";

// Create a new TRPC router only once
export const t = initTRPC.context<Context>().create();
