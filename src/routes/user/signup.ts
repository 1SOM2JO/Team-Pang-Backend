import express from 'express';
import validator from '../../middleware/validator';
import schema from '../../schema/user';
import asyncHandler from '../../middleware/asyncHandler';
import { RoleRequest } from 'app-request';
import UserRepo from '../../database/repository/UserRepo';
import { getCustomRepository } from 'typeorm';
import { BadRequestError, NotFoundError } from '../../core/ApiError';
import bcrypt from 'bcrypt';
import { client } from '../../app';

const router = express.Router();

router.post(
  '/basic',
  validator(schema.signup),
  asyncHandler(async (req: RoleRequest, res) => {
    const userRepo = getCustomRepository(UserRepo);

    const user = await userRepo.findById(req.body.id);
    if (user) throw new BadRequestError('User already registered');

    const code = await client.get(req.body.phonenumber);

    const passwordHash = await bcrypt.hash(req.body.password, 10);
  }),
);
