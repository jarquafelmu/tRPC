import { initTRPC } from "@trpc/server";

// Create a new TRPC router only once
export const t = initTRPC.create();
