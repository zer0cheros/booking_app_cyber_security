import { Router } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import { conn, registerUser } from "../core/db/db.ts";
const router = new Router();

router. get("/", ({request, response}) => {
  response.body = "Hello World!";
})


router.post("/register", async ({request, response}) => {
  const { username, email, password } = await request.body.json()
  await conn();
  const res = await registerUser({username, email, password});
  response.body = { message: res} ;
});

export default router;