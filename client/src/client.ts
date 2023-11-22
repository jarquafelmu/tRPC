import {
  createTRPCProxyClient,
  createWSClient,
  wsLink,
  splitLink,
  httpBatchLink,
} from "@trpc/client";
import { AppRouter } from "../../server/api";

const wsClient = createWSClient({
  url: "ws://localhost:3000/trpc",
});

const client = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      // Whenever we send a request, check if it's a subscription
      condition: (op) => {
        return op.type === "subscription";
      },
      // If it is a subscription, use the websocket link
      true: wsLink({
        client: wsClient,
      }),
      // If it is not a subscription, use the httpBatchLink
      false: httpBatchLink({
        // sends all requests at once so less network usage for your consumer
        url: "http://localhost:3000/trpc",
      }),
    }),
  ],
});

document.addEventListener("click", () => {
  client.users.update.mutate({ userId: "1", name: "Kyle" });
});

async function main() {
  // the first part is undefined because we have no input to give
  client.users.onUpdate.subscribe(undefined, {
    onData: (id) => {
      console.log(`User ${id} was updated`);
    },
  });
  wsClient.close();
}

main().catch((err) => {
  console.error(err);
});
