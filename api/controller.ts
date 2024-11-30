import { Router } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import { login, registerUser } from "../core/auth/config.ts";
import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";
import index from "../index.json" with { type: "json" };

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const registerSchema = z.object({
  username: z
    .string()
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" })
    .min(3, "Username must be at least 3 characters long")
    .max(50, "Username must not exceed 50 characters"),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
});

const router = new Router();

router. get("/", ({request, response}) => {
  response.body = index
})

router.get("/api/login", ({response}) => {
  response.body = { message: "Welcome to the API" };
});



router.get("/api/register", ({response}) => {
  response.body = { message: "Welcome to the API" };
});


router.post("/api/register", async ({request, response}) => {
  const { username, email, password } = await request.body.json()
  try {
    registerSchema.parse({ username, email, password });
    const res = await registerUser({ username, email, password });
    response.body = { message: res } 
  } catch (error) {
    if (error instanceof z.ZodError) {
      response.status = 400;
      response.body = `Validation Error: ${error.errors.map(e => e.message).join(", ")}`;
    }
  }
});

router.post("/api/login", async ({request, response}) => {
  const { email, password } = await request.body.json();
  try {
    loginSchema.parse({ email });
    const res = await login({ email, password });
    if (typeof res !== 'object') {
      response.status = 401;
    }
    response.body = { message: res };
  } catch (error) {
     if (error instanceof z.ZodError) {
      response.status = 400;
      response.body =  `Validation Error: ${error.errors.map(e => e.message).join(", ")}`;
  }
}  
})

export default router;