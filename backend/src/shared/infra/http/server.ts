import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm/';
import '@shared/container';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';

import routes from './routes';

const app = express();
app.use(cors());

app.use(rateLimiter);
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);
app.use(errors());
app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.log(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('💻 Server started on port 3333!');
});
