import {  Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
const env = config();

const pool = new Pool({
    hostname: "localhost",
    port: 5432,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
},10)


export default pool;
