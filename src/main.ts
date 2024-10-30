import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import router from './routes/controller.ts';
const server = new Application();

server.use(router.routes());
server.use(router.allowedMethods());

// Start the server
const PORT = 5000;


await server.listen({ port: PORT });

