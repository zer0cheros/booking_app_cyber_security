import {  Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { Users } from "../types.ts";
import { hash, genSalt, compare } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import { createToken } from "../auth/config.ts";

const env = config();

const pool = new Pool({
    hostname: "localhost",
    port: 5432,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
},10)


export async function registerUser({username, email, password}:Users): Promise<string>  {
    const salt = await genSalt(8); 
    if (password.length < 8) {
        return "Password too short";
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
       return "Invalid email format";
    }
    const hashedPassword = await hash(password, salt);
    let db;
    try {
        db = await pool.connect();
        await db.queryObject({
            text: `INSERT INTO acce_users (username, email, password) VALUES ($1, $2, $3)`,
            args: [username, email, hashedPassword],
        });
        return 'User Created';
    } catch (error) {
        console.error("Error registering user:", error);
        return "Registration failed";
    } finally {
        if (db) {
            db.release();
        }
    }
}

export async function login({email, password}:Users): Promise<string | {msg: string, credentials: string}> {
    let db;
    try {
        db = await pool.connect();
        const result = await db.queryObject({
            text: `SELECT * FROM acce_users WHERE email = $1`,
            args: [email],
        });
        if (result.rows.length === 0) {
            return "User or password incorrect";
        }
        const user: Users = result.rows[0] as Users;

        const passwordMatch = await compare(password, user.password);
        if (passwordMatch) {
            const token = await createToken({ email:email, id:user.id });
            return {msg: "Login successful", credentials: token};
        } else {
            return "User or password incorrect";
        }
    } catch (error) {
        console.error("Error logging in:", error);
        return "Login failed";
    } finally {
        if (db) {
            db.release();
        }
    }
}
