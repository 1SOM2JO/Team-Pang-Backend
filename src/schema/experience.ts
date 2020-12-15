import Joi from '@hapi/joi';
import { JoiAuthBearer } from '../middleware/validator';

export default {
  registration: Joi.object().keys({
    "experienceName": Joi.string().min(2).required(),
    "price": Joi.string().required(),
    "province": Joi.string().required(),
    "county": Joi.string().required(),
    "start_day": Joi.string().required(),
    "end_day": Joi.string().required(),
    "image": Joi.any().required()
  }),
};