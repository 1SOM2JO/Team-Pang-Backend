import express from 'express';
import { ForbiddenError } from '../core/apiError';
import { PublicRequest } from 'app-request';
import asyncHandler from '../middleware/asyncHandler';
import { apiKey } from '../config';
import Logger from '../core/Logger';
import validator, { ValidationSource } from '../middleware/validator';
import schema from '../schema/auth';

const router = express.Router();

export default router.use(
  validator(schema.apiKey, ValidationSource.HEADER),
  asyncHandler(async (req: PublicRequest, res, next) => {
    req.apiKey = req.headers['x-api-key'].toString();

    Logger.info(req.apiKey === apiKey);

    if (apiKey) throw new ForbiddenError();
    return next();
  }),
);
