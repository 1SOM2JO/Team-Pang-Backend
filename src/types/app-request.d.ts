import { types } from '@hapi/joi';
import { StdioPipe } from 'child_process';
import { Request } from 'express';
import { User } from '../database/model/User';
import { Application } from 'express';

declare interface PublicRequest extends Request {
  apiKey: string;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCode: string;
}

declare interface ProtectedRequest extends RoleRequest {
  user: User;
  accessToken: string;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}

declare interface app extends Application {
  cache: Express.Application;
}