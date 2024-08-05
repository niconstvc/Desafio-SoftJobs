import path from 'node:path';
import express from 'express';
import { URL } from 'url';
import { CorsMiddleware } from './middlewares/cors.middleware.js';

const __dirname = new URL('.', import.meta.url).pathname;

export class Server {

  constructor({ app, port, routes, acceptedOrigins, publicPath = 'public', serverListener }) {
    this.app = app;
    this.port = port;
    this.routes = routes;
    this.acceptedOrigins = acceptedOrigins;
    this.publicPath = publicPath;
    this.serverListener = undefined;
  }

  async start() {


    this.app.use(CorsMiddleware.corsAllow({acceptedOrigins: this.acceptedOrigins}))
    this.app.use(express.json()); 
    this.app.use(express.urlencoded({ extended: true }));
    this.app.disable('x-powered-by');

    this.app.use(express.static(this.publicPath));


    this.app.use(this.routes);

  
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname + `../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`🚀 Server running on port ${this.port}`);
    });

  }

  close() {
    this.serverListener?.close();
  }

}