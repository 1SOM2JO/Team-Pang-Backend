import Joi from '@hapi/joi';
import { join } from 'path';
import { JoiAuthBearer } from '../middleware/validator';

export default {
  registration: Joi.object().keys({
    "experienceName": Joi.string().min(2).required(),
    "price": Joi.string().required(),
    "province": Joi.string().required(),
    "county": Joi.string().required(),
    "description": Joi.string(),
    "start_day": Joi.string().min(10).max(10).required(),
    "end_day": Joi.string().min(10).max(10).required(),
  }),
};