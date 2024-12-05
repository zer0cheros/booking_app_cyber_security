import { Router } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import { AppState } from "../../main.ts";
import { AdminMiddleware, isLoggedIn } from "../middleware.ts";
import { createReservation, getReservations, getResources, createResource } from "../../core/auth/reservation.ts";
import { checkIFUserIsOver15, getUserId } from "../../core/auth/user.ts";
import { ValidateSession } from "../../core/auth/sessionHandler.ts";


const router = new Router<AppState>();

router.post("/api/reservation", isLoggedIn, async (ctx) => {
    const { resource_id, start_date, end_date } = await ctx.request.body.json()
        const user = await checkIFUserIsOver15(ctx.state.session.get('sessionData').username);
        if(!user) {
            ctx.response.status = 400;
            ctx.response.body = { message: "User is under 15" };
            return;
        }
        const user_id = await getUserId(ctx.state.session.get('sessionData').username);
        if(!user_id) {
            ctx.response.status = 400;
            ctx.response.body = { message: "User not found" };
            return;
        }
        const res = await createReservation({resource_id, user_id, start_date, end_date});
        ctx.response.body = { res };
});

router.get("/api/reservation", async (ctx) => {
    const session = ValidateSession(ctx);
    const res = await getReservations(session);
    ctx.response.body = { res };
});


router.get("/api/resource", AdminMiddleware, async (ctx) => {
    const res = await getResources();
    ctx.response.body = { res };
});

router.post("/api/resource", AdminMiddleware, async (ctx) => {
    const { name, description } = await ctx.request.body.json();
    console.log(name, description);
    const res = await createResource({ resource_name: name, resource_description: description });
    ctx.response.body = { res };
});
  
export default router;