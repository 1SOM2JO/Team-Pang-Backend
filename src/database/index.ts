import { ConnectionOptions } from 'typeorm';
import { environment } from '../config';
import { db } from '../config';
import Container from 'typedi';
import { Connection, createConnection, useContainer } from 'typeorm';

export default async (): Promise<Connection> => {
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

  useContainer(Container);

  const connection = await createConnection(connectionOptions);

  return connection;
};
