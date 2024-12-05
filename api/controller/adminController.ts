import { Router } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import { login, registerUser } from '../../core/auth/user.ts'
import { AppState } from "../../main.ts";
import { AdminMiddleware, isLoggedIn } from "../middleware.ts";
import { deleteReservation } from "../../core/auth/adminActions.ts";

const router = new Router<AppState>();

router.post("/api/profile/delete/reservation", AdminMiddleware, async ({ response, request, state }) => {
    const id = request.url.searchParams.get("id")
    if (!id) {
        response.status = 400; 
        response.body = { error: "Reservation ID is required" };
        return;
    }
    await deleteReservation(id);
    response.status = 200; 
    response.body = { message: `Reservation with ID ${id} deleted` };
})

export default router