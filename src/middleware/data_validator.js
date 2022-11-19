const apiResponse = require('../helpers/api_response');
// const errorDetails = require('../helpers/error_details');

/**
 *
 * @param validationSchema in /validations/ object
 * @param property string
 * @returns {function(...[*]=)}
 */
const validator = (validationSchema, property) => {
  return (req, res, next) => {
    const { error } = validationSchema.validate(req[property], {
      abortEarly: false,
    });

    const valid = error == null;

    if (valid) {
      next();
      return null;
    }
    const { details } = error;
    const validation_messages = details.map((i) => i.message);

    return apiResponse.errorApiResponse(res, { validation_messages, details }, 'Validation failed.', 422);
  };
};

module.exports = validator;
