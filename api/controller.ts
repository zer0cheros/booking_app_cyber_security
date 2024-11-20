import { Router } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import { registerUser } from "../core/db/config.ts";
const router = new Router();

router. get("/", ({request, response}) => {
  response.body = "Hello World!";
})


router.post("/api/register", async ({request, response}) => {
  const { username, email, password } = await request.body.json()
  console.log(username)
  const res = await registerUser({ username, email, password });
  response.body = { message: res } ;
});

export default router;