import { create, verify } from "https://deno.land/x/djwt@v3.0.2/mod.ts";
import pool from "../db/config.ts";
import { Users } from "../types.ts";
import { hash, genSalt, compare } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { createHash } from "https://deno.land/std@0.106.0/hash/mod.ts";



export async function registerUser({username, email, password}:Users): Promise<string>  {
  const salt = await genSalt(8); 
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
          const ipAddress = await getPublicIp();
          await logSuccessfulLogin(user.username as string, ipAddress);
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

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);


async function createToken(payload: Record<string, unknown>) {
  return await create({ alg: "HS512", typ: "JWT" }, payload, key);;
}

async function verifyToken(token: string) {
const key = await crypto.subtle.generateKey(
{ name: "HMAC", hash: "SHA-512" },
true,
["sign", "verify"],
);
return await verify(token, key);
}

async function logSuccessfulLogin(username: string, ipAddress: string | null) {
  const pseudonym = pseudonymizeUsername(username);
  let db;
  try {
    db = await pool.connect();
    await db.queryObject(
      "INSERT INTO login_logs (pseudonymized_username, ip_address) VALUES ($1, $2)",
      [pseudonym, ipAddress]
    );
  } catch (error) {
    console.error("Error logging successful login:", error);
  }
  finally {
    if (db) {
      db.release();
    }
  }
}

function pseudonymizeUsername(username: string): string {
  const hash = createHash("sha256");
  hash.update(username);
  return hash.toString();
}
async function getPublicIp() {
  const response = await fetch("https://api64.ipify.org?format=json");
  const data = await response.json();
  return data.ip;
}