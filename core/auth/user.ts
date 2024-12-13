import { create, verify } from "https://deno.land/x/djwt@v3.0.2/mod.ts";
import pool from "../db/config.ts";
import { Users, SessionType} from "../types.ts";
import { hash, genSalt, compare } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { createHash } from "https://deno.land/std@0.106.0/hash/mod.ts";
import { createSession } from "./sessionHandler.ts";
import { Context } from "https://deno.land/x/oak@v17.1.2/mod.ts";



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


export async function login({email, password}:Users, ctx:Context): Promise<string | {msg: string, credentials: string}> {
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
          if (!user.username) {
              throw new Error("Username is undefined");
          }
          const session:SessionType = createSession({ username: user.username, role: user.role, age: user.age } as Users, ctx);
          const token = await createToken({ id:session.sessionId  });
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
export async function checkIFUserIsOver15(username:string): Promise<boolean> {
  const db = await pool.connect();
  try {
      const result = await db.queryObject({
          text: `SELECT * FROM acce_users WHERE username = $1`,
          args: [username],
      });
      console.log(result.rows)
      if (result.rows.length === 0) {
          return false;
      }
      const user: Users = result.rows[0] as Users;
      if (user.age == undefined || user.age < 15) {
          return false;
      }
      return true;
  } catch (error) {
      console.error("Error getting user:", error);
      return false;
  } finally {
      db.release();
  }
}





const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);


function createToken(payload: Record<string, unknown>) {
  return create({ alg: "HS512", typ: "JWT" }, payload, key);
}

export  function verifyToken(token: string) {
  return verify(token, key);
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

export async function getUserId(_username?: string, _email?: string): Promise<number | null> {
  const db = await pool.connect();
  try {
    const result = await db.queryObject({
      text: `SELECT * FROM acce_users WHERE username = $1`,
      args: [_username],
    });
    if (result.rows.length === 0) {
      return null;
    }
    const user = result.rows[0] as { id: number };
    return user.id;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  } finally {
    db.release();
  }
}

export async function getUser(username: string): Promise<Users | null> {
  const db = await pool.connect();
  try {
    const result = await db.queryObject({
      text: `SELECT * FROM acce_users WHERE username = $1`,
      args: [username],
    });
    if (result.rows.length === 0) {
      return null;
    }
    // Not goodlooking code but it works
    const userRow = result.rows[0] as { id:number, username: string, email: string, role: string, age: number };
    // Sending only the necessary data
    const user = {
      id: userRow.id,
      username: userRow.username,
      email: userRow.email,
      role: userRow.role,
      age: userRow.age, 
    }
    return user as Users;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  } finally {
    db.release();
  }
}

export async function deleteUser(username: string): Promise<string> {
  const db = await pool.connect();
  try {
    await db.queryObject({
      text: `DELETE FROM acce_users WHERE username = $1`,
      args: [username],
    });
    return "User deleted";
  } catch (error) {
    console.error("Error deleting user:", error);
    return "Error deleting user";
  } finally {
    db.release();
  }
}