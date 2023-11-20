import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

// created for each request
export const createContext = () => ({
  isAdmin: true,
}); // no context
export type Context = Awaited<ReturnType<typeof createContext>>;
