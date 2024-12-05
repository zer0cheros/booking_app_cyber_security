import { Application } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import indexRouter from './api/controller/indexController.ts';
import userRouter from "./api/controller/userController.ts";
import bookingRouter from "./api/controller/bookingController.ts";
import adminRouter from "./api/controller/adminController.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { header } from "./api/middleware.ts";
import { Session } from "https://deno.land/x/oak_sessions@v9.0.0/mod.ts";
import { session } from "./core/auth/sessionHandler.ts";

export type AppState = {
  session: Session
}


const server = new Application<AppState>();

server.use(session);
server.use(
  oakCors({
    origin: `http://localhost:5173`,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: "POST, GET, OPTIONS",
  }),
);

server.use(header);
// Routes
server.use(userRouter.routes());
server.use(userRouter.allowedMethods());
server.use(indexRouter.routes());
server.use(indexRouter.allowedMethods()); 
server.use(bookingRouter.routes());
server.use(bookingRouter.allowedMethods());
server.use(adminRouter.routes());
server.use(adminRouter.allowedMethods());



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
