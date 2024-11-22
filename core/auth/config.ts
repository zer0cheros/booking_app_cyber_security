import { create } from "https://deno.land/x/djwt@v3.0.2/mod.ts";
import { verify } from "https://deno.land/x/djwt@v3.0.2/mod.ts";

const key = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  );


export async function createToken(payload: Record<string, unknown>) {
    return await create({ alg: "HS512", typ: "JWT" }, payload, key);;
}

export async function verifyToken(token: string) {
const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);
return await verify(token, key);
}