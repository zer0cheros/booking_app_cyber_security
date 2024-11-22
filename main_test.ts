import { Application } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import router from "./api/controller.ts";
import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
  const app = new Application();
    app.use(router.routes());
    app.use(router.allowedMethods());

Deno.test("GET /api/register should return Registration HTML", async () => {

  const request = new Request("http://localhost:5000/api/register", { method: "GET" });
  const response = await app.handle(request);
  if(response) {
    assertEquals(response.status, 200);
   assertEquals(await response.text(), "Registration");
  }
  
});


Deno.test("POST /api/register should register a user successfully", async () => {
  const request = new Request("http://localhost:5000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "testuser24", email: "test24@example.com", password: "123456222" }),
  });
  const response = await app.handle(request);
  if(response) {
    const json = await response.json()  
    assertEquals(json.message, "User Created");
  }
}) 
