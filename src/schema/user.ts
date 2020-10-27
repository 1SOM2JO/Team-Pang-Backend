import Joi from '@hapi/joi';
import { JoiAuthBearer } from '../middleware/validator';

export default {
  userCredential: Joi.object().keys({
    id: Joi.string().required().min(6),
    password: Joi.string().required().min(6),
  }),
  phone: Joi.object().keys({
    phonenumber: Joi.string().required().min(13).max(13),
  }),
  refreshToken: Joi.object().keys({
    refreshToken: Joi.string().required().min(1),
  }),
  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),
  signup: Joi.object().keys({
    id: Joi.string().required().min(6),
    permission: Joi.string().required(),
    nickname: Joi.string().required().min(2),
    password: Joi.string().required().min(6),
    phonenumber: Joi.string().required().min(13).max(13),
    code: Joi.string().required().min(6).max(6),
  }),
};
