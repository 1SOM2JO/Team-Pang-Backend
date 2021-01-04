import Joi from '@hapi/joi';

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
  commentRegistration: Joi.object().keys({
    "post_uuid": Joi.number().required(),
    "star": Joi.number().required(),
    "comment": Joi.string().max(250).required()
  }),
  like: Joi.object().keys({
    "post_uuid": Joi.number().required(),
  }),
  unlike:Joi.object().keys({
    "post_uuid": Joi.number().required(),
  })
};