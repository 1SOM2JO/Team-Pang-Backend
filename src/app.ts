import * as express from 'express';
import loaders from './loaders';
import Logger from './core/Logger';
import { port, environment } from './config';

const app = express.default();

async function main() {
  await loaders(app);

  if(environment !== "test") {
    app.listen(80, () => {    
      Logger.info(`server running on port : ${port}`);
    });
  }
}

main();

export default app;