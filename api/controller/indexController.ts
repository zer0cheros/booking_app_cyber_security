import { Router } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import index from "../../index.json" with { type: "json" };
import { AppState } from "../../main.ts";



const router = new Router<AppState>();

router. get("/", (ctx) => {
  ctx.response.body = index
})

router.get("/api/login", ({response}) => {
  response.body = { message: "Welcome to the API" };
});

router.get("/api/register", ({response, state}) => {
  response.body = { message: "Welcome to the API" };
});


export default router;