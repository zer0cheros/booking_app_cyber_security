import { Router } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import index from "../../index.json" with { type: "json" };
import { AppState } from "../../main.ts";
import terms from "../../terms.json" with { type: "json" };



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


router.get("/api/terms", ({response, state}) => {
  response.body = terms["terms_of_service"];
});

router.get("/api/privacy", ({response, state}) => {
  response.body = terms["privacy_policy"];
});

export default router;