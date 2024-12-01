import {  Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import postgres from 'https://deno.land/x/postgresjs@v3.1.0/mod.js'
const env = config();

const pool = new Pool({
    hostname: "localhost",
    port: 5432,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
},5)

export const sql = postgres({
    hostname: "localhost",
    port: 5432,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
})



export default pool;
