import * as express from 'express';
import 'reflect-metadata';
import database from './database';
import server from './server';
import cachedb from './cachedb';
import Logger from '../core/Logger';
import { loggers } from 'winston';


export default async (app: express.Application) => {
  const connection = await database();
  Logger.info('DB loaded and connected!');

  const client = await cachedb();
  client.on('connect', () => Logger.info('✓ redis connection success.'));

  await server(app);
  Logger.info('Server loaded!');
};