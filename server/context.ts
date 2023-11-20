import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

// created for each request
export const createContext = ({ req, res }: CreateExpressContextOptions) => ({
  req,
  res,
  isAdmin: false,
}); // no context
export type Context = Awaited<ReturnType<typeof createContext>>;
