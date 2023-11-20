import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import { AppRouter } from "../../server/api";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    // links will be called one after another relaying the results to the next link
    // order matters as some links are ending links and will not call the next link
    // httpBatchLink is an ending link
    loggerLink(), // logs requests and responses in a nice format to the console for figuring out what's going on
    // httpLink({ // like batch but sends each request one at a time
    //   url: "http://localhost:3000/trpc",
    // }),
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
