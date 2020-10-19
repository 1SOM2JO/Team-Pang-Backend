import Joi from '@hapi/joi';
import { JoiAuthBearer } from '../middleware/validator';

export default {
  userCredential: Joi.object().keys({
    id: Joi.string().required().min(6),
    password: Joi.string().required().min(6),
  }),
  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),
  signup: Joi.object().keys({
    id: Joi.string().required().min(6),
    permission: Joi.string().required(),
    nickname: Joi.string().required().min(3),
    password: Joi.string().required().min(6),
    phonenumber: Joi.string().required().min(11).max(11),
    code: Joi.number().required().min(6).max(6),
  }),
};
