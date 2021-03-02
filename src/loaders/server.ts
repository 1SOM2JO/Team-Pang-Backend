import Logger from '../core/Logger';
import { environment } from '../config';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'reflect-metadata';
import { NotFoundError, ApiError, InternalError } from '../core/apiError';
import { createConnection } from 'typeorm';
import connectionOptions from './database';
import morgan from 'morgan';
import router from '../routes';

export default (app: express.Application) => {
    // const print = async () => {
    //     await client.set("asdf", "1234");
    //     console.log(await client.get("asdf"));
    // }
    
    print()
    
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    app.use(morgan("dev"));

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
};