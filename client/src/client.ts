import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../server/api";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

async function main() {
  // const result = await client.log.mutate(2); // This will throw an error
  const result = await client.users.update.mutate({
    userId: "1",
    name: "Kyle",
  }); // gives an error without any input
  console.log(result);
}

main().catch((err) => {
  console.error(err);
});
