import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:5000",
      "Access-Control-Allow-Credentials": "true",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains", 
      "X-Content-Type-Options": "nosniff", 
      "X-Frame-Options": "DENY", 
      "X-XSS-Protection": "1; mode=block",
      "Content-Security-Policy": `
        default-src 'none';
        script-src 'self';
        style-src 'self';
        img-src 'self' data:;
        connect-src 'self' http://localhost:5000;
        font-src 'self';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'self';
        object-src 'none';
      `,
    },
    strictPort: true,
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