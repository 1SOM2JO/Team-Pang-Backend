import express from 'express';
import schema from '../schema/auth';
import { ProtectedRequest } from 'app-request';
import validator, { ValidationSource } from '../middleware/validator';
import asyncHandler from '../middleware/asyncHandler';
import { getAccessToken, validateTokenData } from './authUtils';
import userRepo from '../database/repository/UserRepo';
import JWT from '../core/JWT';
import {
  AuthFailureError,
  AccessTokenError,
  TokenExpiredError,
} from '../core/apiError';
import { User } from '../database/model/User';

const router = express.Router();

export default router.use(
  validator(schema.auth, ValidationSource.HEADER),
  asyncHandler(async (req: ProtectedRequest, res, next) => {
    req.accessToken = getAccessToken(req.headers.authorization);

    try {
      const payload = await JWT.validate(req.accessToken);
      validateTokenData(payload);

      const user: User = await userRepo.findByUuid(payload.sub);
      if (!user) throw new AuthFailureError('User not registered');
      if (user.accessTokenKey !== payload.prm)
        throw new AuthFailureError('Invalid access token');
      req.user = user;

      return next();
    } catch (e) {
      if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
      throw e;
    }
  }),
);
