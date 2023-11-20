import express from "express";
import cors from "cors";
import ws from "ws";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { appRouter } from "./routers";
import { createContext } from "./context";

const app = express();
// Allow CORS from the client
app.use(cors({ origin: "http://localhost:5173" }));

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const server = app.listen(3000);

applyWSSHandler({
  wss: new ws.Server({ server }),
  router: appRouter,
  createContext,
});

console.log("Server running on port 3000");

export type AppRouter = typeof appRouter;
