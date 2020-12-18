import express from 'express';
import { TokenRefreshResponse } from '../../core/apiResponse';
import { ProtectedRequest } from 'app-request';
import userRepo from '../../database/repository/UserRepo';
import { AuthFailureError } from '../../core/apiError';
import JWT from '../../core/JWT';
import crypto from 'crypto';
import {
  validateTokenData,
  createTokens,
  getAccessToken,
} from '../../auth/authUtils';
import validator, { ValidationSource } from '../../middleware/validator';
import schema from '../../schema/user';
import asyncHandler from '../../middleware/asyncHandler';

const router = express.Router();

router.post(
  '/refresh',
  validator(schema.auth, ValidationSource.HEADER),
  validator(schema.refreshToken),
  asyncHandler(async (req: ProtectedRequest, res) => {
    req.accessToken = getAccessToken(req.headers.authorization);

    const accessTokenPayload = await JWT.decode(req.accessToken);
    validateTokenData(accessTokenPayload);

    const user = await userRepo.findByUuid(accessTokenPayload.sub);
    if (!user) throw new AuthFailureError('User not registered');
    req.user = user;

    const refreshTokenPayload = await JWT.validate(req.body.refreshToken);
    validateTokenData(refreshTokenPayload);

    if (accessTokenPayload.sub !== refreshTokenPayload.sub)
      throw new AuthFailureError('Invalid access token');

    if (
      user.accessTokenKey === accessTokenPayload.prm &&
      user.refreshTokenKey === refreshTokenPayload.prm
    )
      throw new AuthFailureError('Invalid access token');

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    await userRepo.UserKeyUpdate(user.uuid, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(
      req.user,
      accessTokenKey,
      refreshTokenKey,
    );

    new TokenRefreshResponse(
      'Token Issued',
      tokens.accessToken,
      tokens.refreshToken,
    ).send(res);
  }),
);

export default router;
