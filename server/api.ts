import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { mergedRouter } from "./routers";

const app = express();
// Allow CORS from the client
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/trpc", createExpressMiddleware({ router: mergedRouter }));

app.listen(3000);

console.log("Server running on port 3000");

export type AppRouter = typeof mergedRouter;
