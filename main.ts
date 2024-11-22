import { Application } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import router from './api/controller.ts';
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { header } from "./api/middleware.ts";
//import { Session, PostgresStore } from "https://deno.land/x/oak_sessions/mod.ts"


const server = new Application();

// const store = new PostgresStore(pool, 'sessions');

// // Initialize sessions table
// await store.initSessionsTable();


// server.use(Session.initMiddleware(store));
server.use(header);
server.use(
  oakCors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    methods: "POST, GET, OPTIONS",
  }),
);
server.use(router.routes());
server.use(router.allowedMethods()); 

// Start the server
const PORT = Deno.env.get('PORT') ? Number(Deno.env.get('PORT')) : 5000;

try {
  await server.listen({ port: PORT });
  console.log(`Server is running on port ${PORT}`);
} catch (error) {
  if (error instanceof Error) {
    console.error(`Failed to start server: ${error.message}`);
  } else {
    console.error('Failed to start server due to an unknown error');
  }
  Deno.exit(1);
}
