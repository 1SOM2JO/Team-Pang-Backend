import express, { Request, Response, NextFunction } from 'express';
import Logger from './core/Logger';
import bodyParser from 'body-parser';
import cors from 'cors';
import { environment } from './config';
import 'reflect-metadata';
import { NotFoundError, ApiError, InternalError } from './core/apiError';
import { createConnection } from 'typeorm';
import connectionOptions from './database';
import redis from 'redis';
import morgan from 'morgan';
import { port } from './config';
import router from './routes';

export const client = redis.createClient(6379, '127.0.0.1');

const app = express();

app.listen(80, () => {
  Logger.info(`server running on port : ${port}`);
});

app.use(bodyParser.json({ limit: '10mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '10mb',
    extended: true,
    parameterLimit: 50000,
  }),
);
app.use(cors());
app.use(morgan('dev'));

createConnection(connectionOptions)
  .then(() => {
    Logger.info('✓ DB connection success.');
  })
  .catch((error) => Logger.error(error));

client.on('connect', () => Logger.info('✓ redis connection success.'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

app.use('/', router);

app.use((req, res, next) => next(new NotFoundError()));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (environment === 'development') {
      Logger.error(err);
      return res.status(500).send(err.message);
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;
