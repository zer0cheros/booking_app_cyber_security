import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Access-Control-Allow-Origin": "http://192.168.2.122:5000",
      "Strict-Transport-Security": "max-age=86400; includeSubDomains", 
      "X-Content-Type-Options": "nosniff", 
      "X-Frame-Options": "DENY", 
      "X-XSS-Protection": "1; mode=block",
      'Content-Security-Policy': `default-src 'self'; script-src 'self'; script-src-elem 'self'; style-src 'self'; style-src-elem 'self'; img-src 'self'; connect-src 'self'; frame-src 'self'; frame-ancestors 'self'; font-src 'self'; media-src 'self'; object-src 'self'; manifest-src 'self'; worker-src 'self'; form-action 'self';`,
    },
    fs: {
      deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/latest/meta-data/**', '**/latest/**']
    },
    host: "192.168.2.122",
        proxy: {
      "/api": {
        target: "http://192.168.2.122:5000",
        changeOrigin: false,
        bypass: (req) => {
          if (req.headers.host === '169.254.169.254') {
            return false; // Block requests targeting metadata IP
          }
        },
      },
    },
  }
});