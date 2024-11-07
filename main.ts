import { Application } from "https://deno.land/x/oak/mod.ts";
import router from './api/controller.ts';
const server = new Application();

server.use(router.routes());
server.use(router.allowedMethods());

// Start the server
const PORT = 5000;


await server.listen({ port: PORT });