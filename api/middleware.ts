import { Context, Middleware } from "https://deno.land/x/oak@v17.1.2/mod.ts";



/**
 * Middleware header
 * @param ctx 
 * @param next 
 */
export const header: Middleware = async (ctx: Context, next) => {
    ctx.response.headers.set("X-Content-Type-Options", "nosniff"); 
    await next(); 
  }