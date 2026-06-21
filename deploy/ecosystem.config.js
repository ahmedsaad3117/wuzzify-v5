// PM2 process definitions for the Wuzzify v5 backend + frontend.
// Started by deploy/deploy.sh via `pm2 startOrReload`.
const path = require("path");

const ROOT = path.join(__dirname, "..");
const FRONTEND_PORT = process.env.FRONTEND_PORT || "3000";

module.exports = {
  apps: [
    {
      name: "wuzzify-cms-backend",
      cwd: path.join(ROOT, "backend"),
      // NestJS reads its own .env (in cwd) via @nestjs/config.
      script: "dist/main.js",
      instances: 1,
      exec_mode: "fork",
      env: { NODE_ENV: "production" },
      max_memory_restart: "400M",
      time: true,
    },
    {
      name: "wuzzify-frontend",
      cwd: path.join(ROOT, "nextjs"),
      // Run the Next.js production server directly.
      script: "node_modules/next/dist/bin/next",
      args: `start -p ${FRONTEND_PORT}`,
      instances: 1,
      exec_mode: "fork",
      env: { NODE_ENV: "production" },
      max_memory_restart: "600M",
      time: true,
    },
  ],
};
