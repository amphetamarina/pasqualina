// Boots the dev server (server.mjs) on an ephemeral loopback port for
// integration specs. Returned close() resolves when the port is released.
import { createServer } from "../../server.mjs";

export async function startServer() {
  const server = createServer();
  /** @type {Promise<void>} */
  const listening = new Promise((resolve) => { server.listen({ host: "127.0.0.1", port: 0 }, () => resolve()); });
  await listening;
  const addr = server.address();
  const port = typeof addr === "object" && addr !== null ? addr.port : 0;
  return {
    server, port,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}
