import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { envs } from './config/plugins/envs.js';
import { Server } from './Server.js';
import { AppRouter } from './routes/v1/app.routes.js';

const app = express();

const main = async () => {
  const server = new Server({
    app,
    port: envs.PORT,
    routes: AppRouter.routes,
    acceptedOrigins: [],
  });

  await server.start();
};

(async () => {
  await main();
})();
