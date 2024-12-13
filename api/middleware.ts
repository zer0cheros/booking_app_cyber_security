import { Context, Middleware } from "https://deno.land/x/oak@v17.1.2/mod.ts";

/**
 * Middleware for security headers and request validation
 * @param ctx 
 * @param next 
 */
export const header: Middleware = async (ctx: Context, next) => {
    // Security Headers
    ctx.response.headers.delete("x-forwarded-for");
    ctx.response.headers.set("Content-Security-Policy",
        "default-src 'self'; " +
        "script-src 'self'; " +
        "style-src 'self'; " +
        "img-src 'self'; " +
        "frame-ancestors 'none'; " +
        "form-action 'self';");
    ctx.response.headers.set("X-Frame-Options", "DENY"); 
    ctx.response.headers.set("X-XSS-Protection", "1; mode=block"); 
    ctx.response.headers.set("X-Content-Type-Options", "nosniff");
    ctx.response.headers.set("Strict-Transport-Security", "max-age=86400; includeSubDomains");
    // Host Header Validation
    const allowedHosts = ["localhost", "127.0.0.1"];
    const host = ctx.request.headers.get("host") || "";
    if (!allowedHosts.includes(host.split(":")[0])) {
        ctx.response.status = 403;
        ctx.response.body = { error: "Forbidden: Invalid Host header" };
        return;
    }
    if (ctx.request.url.hostname === "169.254.169.254") {
        ctx.response.status = 403;
        ctx.response.body = { error: "Forbidden: Access to metadata is denied" };
        return;
    }

    await next();
};
export const isLoggedIn:Middleware = async(ctx:Context, next)=> {
    if(ctx.state.session.get('sessionId')) {
        await next()
    } else {
        ctx.response.status = 401;
        ctx.response.body = {message: 'Unauthorized'}
    }
}

export const AdminMiddleware:Middleware = async(ctx:Context, next)=> {
    if(ctx.state.session.get('sessionData').role === 'administrator') {
        await next()
    } else {
        ctx.response.status = 401;
        ctx.response.body = {message: 'Unauthorized'}       
    }
}
