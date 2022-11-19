const joi = require('joi');

/**
 *
 * @type {{eventsCreate: Joi.ObjectSchema<any>}}
 */
const cacheValidationsSchema = {
  createAndUpdateByKey: joi.object({
    key: joi.string().required(),
    value: joi.string().required(),
  }),
};

module.exports = {
  ...cacheValidationsSchema,
};
