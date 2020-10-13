import { ConnectionOptions } from 'typeorm';
import { db } from '../config';

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  synchronize: true,
  logging: true,
  entities: ['./database/model/**/*.ts'],
  database: db.name,
  host: db.host,
  port: db.port,
  username: db.user,
  password: db.password,
};

export default connectionOptions;
