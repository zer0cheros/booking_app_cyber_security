import { Application } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import router from './api/controller.ts';
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { header } from "./api/middleware.ts";
import { Session, PostgresStore } from "https://deno.land/x/oak_sessions@v9.0.0/mod.ts";
import { sql } from "./core/db/config.ts";

export type AppState = {
  session: Session
}


const server = new Application<AppState>();

const store = new PostgresStore(sql, 'sessions')

await store.initSessionsTable()

server.use(Session.initMiddleware(store));

server.use(
  oakCors({
    origin: "http://192.168.2.122:5173",
    optionsSuccessStatus: 200,
    methods: "POST, GET, OPTIONS",
  }),
);

server.use(header);
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
