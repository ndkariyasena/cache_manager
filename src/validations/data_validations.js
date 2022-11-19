const joi = require('joi');

/**
 *
 * @type {{eventsCreate: Joi.ObjectSchema<any>}}
 */
const cacheValidationsSchema = {
  getCacheById: joi.object({
    key: joi.string().required(),
  }),
};

module.exports = {
  ...cacheValidationsSchema,
};
