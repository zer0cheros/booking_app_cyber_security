// deno-lint-ignore-file
import { PostgresStore, Session } from "https://deno.land/x/oak_sessions@v9.0.0/mod.ts";
import { sql } from "../db/config.ts";
import { Context, Middleware } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import { AppState } from "../../main.ts";



const store = new PostgresStore(sql, 'sessions')
await store.initSessionsTable()
export const session:Middleware<AppState, any> = Session.initMiddleware(store)

export function createSession(user: { username: string, role:string, age:Date }, ctx:Context): {sessionId: string, sessionData: {username: string, createdAt: number}} {
    const sessionId = crypto.randomUUID(); 
    const sessionData = {
        username: user.username,
        age: user.age,
        role: user.role,
        createdAt: Date.now(),
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