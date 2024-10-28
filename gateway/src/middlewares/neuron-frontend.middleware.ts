import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as httpProxy from 'http-proxy';

@Injectable()
export class NeuronFrontendMiddleware implements NestMiddleware {
  private proxy = httpProxy.createProxyServer();

  use(req: Request, res: Response, next: NextFunction) {
    const match = req.path.match(/^\/frontend\/([^\/]+)\/(.+)$/);
    if (match) {
      const serviceName = match[1];
      const path = match[2];
      
      const target = `http://onyx-neuron-${serviceName}:5000`;
      
      // Keep the full path after /frontend/serviceName
      const newPath = `/frontend/${path}`;
      req.url = newPath;

      try {
        this.proxy.web(req, res, {
          target: target,
          changeOrigin: true
        }, (err) => {
          if (err) {
            res.status(404).send('Service not found');
          }
        });
      } catch (error) {
        res.status(404).send('Service not found');
      }
    } else {
      next();
    }
  }
}
