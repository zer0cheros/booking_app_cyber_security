import { Router } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import { registerUser, login } from "../core/db/config.ts";


const router = new Router();

router. get("/api/register", ({request, response}) => {
  response.body = "Registration";
})


router.post("/api/register", async ({request, response}) => {
  const { username, email, password } = await request.body.json()
  const res = await registerUser({ username, email, password });
  response.body = { message: res } ;
});

router.post("/api/login", async ({request, response}) => {
  const { email, password } = await request.body.json();
  const res = await login({ email, password });
  response.body = { message: res };
})

export default router;