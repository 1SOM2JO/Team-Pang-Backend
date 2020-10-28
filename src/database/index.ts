import { ConnectionOptions } from 'typeorm';
import { environment } from '../config';
import { db } from '../config';

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  synchronize: true,
  logging: environment === 'development' ? true : false,
  entities: ['./database/model/**/*.ts'],
  database: db.name,
  host: db.host,
  port: db.port,
  username: db.user,
  password: db.password,
};

export default connectionOptions;
