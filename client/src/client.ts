import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../server/api";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      // sends all requests at once so less network usage for your consumer
      url: "http://localhost:3000/trpc",
    }),
  ],
});

async function main() {
  // const result = await client.log.mutate(2); // This will throw an error
  const result = await client.secretData.query();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
});
