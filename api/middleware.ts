import { Context, Middleware } from "https://deno.land/x/oak@v17.1.2/mod.ts";


/**
 * Middleware header
 * @param ctx 
 * @param next 
 */
export const header: Middleware = async (ctx: Context, next) => {
    ctx.response.headers.delete("x-forwarded-for");
    ctx.response.headers.set('Content-Security-Policy', `default-src 'self'; script-src 'self'; script-src-elem 'self'; style-src 'self'; style-src-elem 'self'; img-src 'self'; connect-src 'self'; frame-src 'self'; frame-ancestors 'self'; font-src 'self'; media-src 'self'; object-src 'self'; manifest-src 'self'; worker-src 'self'; form-action 'self';`); 
    ctx.response.headers.set("X-Frame-Options", "DENY"); 
    ctx.response.headers.set("X-XSS-Protection", "1; mode=block"); 
    ctx.response.headers.set("X-Content-Type-Options", "nosniff");
    ctx.response.headers.set("Strict-Transport-Security", "max-age=86400; includeSubDomains");
    await next(); 
  }
