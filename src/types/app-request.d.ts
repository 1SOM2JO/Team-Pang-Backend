import { Request } from 'express';

declare interface PublicRequest extends Request {
  apiKey: string;
}
