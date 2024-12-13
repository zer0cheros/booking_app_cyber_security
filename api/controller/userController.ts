import { Router } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import { deleteUser, getUser, login, registerUser } from '../../core/auth/user.ts'
import { AppState } from "../../main.ts";
import { registerSchema, loginSchema } from "../../core/helper.ts";
import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";
import { AdminMiddleware, isLoggedIn } from "../middleware.ts";
import { getUserReservarion } from "../../core/auth/reservation.ts";



const router = new Router<AppState>();

//register a user
router.post("/api/register", async ({request, response}) => {
    const { username, email, password } = await request.body.json() 
    try {
        registerSchema.parse({ username, email, password });
        const res = await registerUser({ username, email, password });
        response.body = { message: res } 
    } catch (error) {
        if (error instanceof z.ZodError) {
        response.status = 400;
        response.body = `Validation Error: ${error.errors.map(e => e.message).join(", ")}`;
        }
    }
});

//login a user
router.post("/api/login", async (ctx) => {
    const { email, password } = await ctx.request.body.json();
        try {
            loginSchema.parse({ email });
            const res = await login({ email, password }, ctx);
            if (typeof res !== 'object') {
                ctx.response.status = 401;
                ctx.response.body = { error: "Invalid credentials" };
                return;
            }
            ctx.state.session.set('sessionId', res.credentials)
            ctx.response.headers.set('Set-Cookie', `sessionId=${res.credentials}; HttpOnly; Path=/; SameSite=Lax; Secure=false`)
            ctx.response.body = { message: "Login successful", cookie: res.credentials };
        } catch (error) {
            if (error instanceof z.ZodError) {
                ctx.response.status = 400;
                ctx.response.body =  `Validation Error: ${error.errors.map(e => e.message).join(", ")}`;
            }
    }  
})

//logout a user
router.get("/api/logout", async ({ response, state, cookies }) => {
    try {
        await state.session.deleteSession();
        cookies.set("sessionId", "", {
            httpOnly: true,
            secure: false, 
            sameSite: "none", 
            path: "/",
            expires: new Date(0), 
        });

        response.body = { message: "Logged out successfully" };
    } catch (error) {
        response.status = 500;
        response.body = { error: "An error occurred during logout" };
        console.error("Logout error:", error);
    }
});


router.get("/api/profile", isLoggedIn, async ({ response, state }) => {
    const sessionData = state.session.get('sessionData')
    const user = await getUser(sessionData.username)
    if(!user) {
        response.status = 404;
        response.body = { error: "User not found" };
        return;
    }
    const reservationData = await getUserReservarion(user?.id)
    response.body = { user: user, reservation: reservationData }
})

router.post("/api/profile/delete", isLoggedIn, async (ctx) => {
    const user = ctx.state.session.get('sessionData')
    if(!user) {
        ctx.response.status = 404;
        ctx.response.body = { error: "User not found" };
        return;
    }
    try {
        await deleteUser(user.username)
        ctx.state.session.deleteSession()
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { error: "An error occurred during deletion" };
        console.error("Deletion error:", error);    
    }
    ctx.response.body = { message: "User deleted" };
});


export default router