import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import process from "node:process";

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Access-Control-Allow-Origin": `http://localhost:5000`,
      "Access-Control-Allow-Credentials": "true",
      "Strict-Transport-Security": "max-age=86400; includeSubDomains", 
      "X-Content-Type-Options": "nosniff", 
      "X-Frame-Options": "DENY", 
      "X-XSS-Protection": "1; mode=block",
      "Content-Security-Policy": "script-src 'self' 'sha256-8ZgGo/nOlaDknQkDUYiedLuFRSGJwIz6LAzsOrNxhmU=';",

    },
    fs: {
      deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/latest/meta-data/**', '**/latest/**']
    },
    host: `localhost`,
        proxy: {
      "/api/login": {
        target: `http://localhost:5000/`,
        changeOrigin: false,
        
        // bypass: (req) => {
        //   if (req.headers.host === '169.254.169.254') {
        //     return false; // Block requests targeting metadata IP
        //   }
        // },
      },
    },
  }
});