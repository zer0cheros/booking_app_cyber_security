import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { Users } from "../types.ts";
import { hash, genSalt } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const env = config();


const db = new Client({
    hostname: "localhost",
    port: 5432,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  });

  export async function conn() {
    await db.connect();
    console.log("Connected to the database");
  }


export async function registerUser({username, email, password}:Users): Promise<string>  {
    const salt = await genSalt(8);
    if (password.length < 8) {
        throw new Error("Password too short");
    }
  if (!email.includes("@")) {
    throw new Error("Invalid email format");
  }
  const hashedPassword = await hash(password, salt);
  try {
    await db.queryObject`
      INSERT INTO users (name, email, password_hash)
      VALUES (${username}, ${email}, ${hashedPassword})
    `;
    return 'User Created';
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Registration failed");
  }
}