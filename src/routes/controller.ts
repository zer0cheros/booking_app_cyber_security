import { Router } from "https://deno.land/x/oak/mod.ts";
const router = new Router();

router. get("/", ({request, response}) => {
  response.body = "Hello World!";
})


router.post("/register", async ({request, response}) => {
  const { username, email, password } = await request.body.json()
  response.body = { message: username + " " + email + " " + password } ;
});

export default router;