import express from 'express';
import validator from '../../middleware/validator';
import { SuccessResponse } from '../../core/apiResponse';
import schema from '../../schema/user';
import asyncHandler from '../../middleware/asyncHandler';
import { RoleRequest } from 'app-request';
import userRepo from '../../database/repository/UserRepo';
import { BadRequestError, NotFoundError } from '../../core/apiError';
import bcrypt from 'bcrypt';
import { client } from '../../app';
import _ from 'lodash';
import { send } from '../../middleware/smsSender';
import { environment } from '../../config';

const router = express.Router();

router.post(
  '/smsSender',
  validator(schema.phone),
  asyncHandler(async (req: RoleRequest, res) => {
    const user = await userRepo.findByPhonenumber(req.body.phonenumber);

    if (user) throw new BadRequestError('phonenumber already registered');

    let ranCode = Math.floor(Math.random() * 1000000) + 100000;
    if (ranCode > 1000000) ranCode = ranCode - 100000;

    send(req.body.phonenumber, ranCode.toString());

    client.set(
      req.body.phonenumber,
      environment === 'development' ? ranCode.toString() : '123456',
    );

    new SuccessResponse('send success', {}).send(res);
  }),
);

router.post(
  '/basic',
  validator(schema.signup),
  asyncHandler(async (req: RoleRequest, res) => {
    const user = await userRepo.findById(req.body.id);
    if (user) throw new BadRequestError('User already registered');

    const result = await client.get(req.body.phonenumber);

    if (!result) throw new NotFoundError('can not found phonenumber');
    if (req.body.code !== result) throw new BadRequestError('incorrect code');

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const createdUser = await userRepo.createUser(
      req.body.id,
      req.body.permission,
      req.body.nickname,
      passwordHash,
      req.body.phonenumber,
    );

    new SuccessResponse('Signup Successful', {
      createdUser,
    }).send(res);
  }),
);

export default router;
