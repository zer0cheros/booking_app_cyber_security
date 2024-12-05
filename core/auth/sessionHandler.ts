// deno-lint-ignore-file
import { PostgresStore, Session } from "https://deno.land/x/oak_sessions@v9.0.0/mod.ts";
import { sql } from "../db/config.ts";
import { Context, Middleware } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import { AppState } from "../../main.ts";
import { Users } from "../types.ts";



const store = new PostgresStore(sql, 'sessions')
await store.initSessionsTable()
export const session:Middleware<AppState, any> = Session.initMiddleware(store, {
    cookieSetOptions: {
        httpOnly: true,
        sameSite: 'lax',
        //secure: true,
        maxAge: 1000 * 60 * 60 * 24
    },
})
export function createSession(user:Users , ctx:Context): {sessionId: string, sessionData: {username: string, createdAt: number}} {
    const sessionId = crypto.randomUUID(); 
    const sessionData = {
        username: user.username,
        age: user.age,
        role: user.role,
        createdAt: Date.now(),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };
    const session = {sessionId, sessionData};
    ctx.state.session.set('sessionId', session.sessionId);
    ctx.state.session.set('sessionData', session.sessionData);
    return session; 
}

export function ValidateSession(ctx:Context) {
    console.log("hej")
    if(ctx.state.session.get('sessionId')) {
        return true;
    } else {
        return false;
    }
}