import express from 'express';
import { ProtectedRequest } from 'app-request';
import { AuthFailureError } from '../core/apiError';
import asyncHandler from '../middleware/asyncHandler';
import { userInfo } from 'os';

const router = express.Router();

export default router.use(
  asyncHandler(async (req: ProtectedRequest, res, next) => {
    if (!req.user || !req.user.permission || !req.currentRoleCode)
      throw new AuthFailureError('Permission denied');

    if (req.user.permission !== req.currentRoleCode)
      throw new AuthFailureError('Permission denied');

    return next();
  }),
);
