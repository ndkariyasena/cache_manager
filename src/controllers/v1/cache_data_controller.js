/* Module imports */
const apiResponse = require('../../helpers/api_response');
const cacheDataService = require('../../services/v1/cache_data_service');

/**
 * Cache data get by Key request
 * @param req
 * @param res
 */
exports.getCacheByKey = async (req, res) => {
  try {
    const {
      params: { cache_key },
    } = req;

    return await cacheDataService
      .getCacheByKey(cache_key)
      .then((response) => {
        return apiResponse.successApiResponse(res, response, 'success', 200);
      })
      .catch((error) => {
        console.error('Cache data read error : '.error);

        return apiResponse.errorApiResponse(res, error, 'error', 404);
      });
  } catch (error) {
    return apiResponse.authErrorApiResponse(res, {}, 'Invalid request', 400);
  }
};

/**
 * Cache data get by Key request
 * @param req
 * @param res
 */
exports.getAllKeys = async (req, res) => {
  try {
    return await cacheDataService
      .getAllCachedKeys()
      .then((response) => {
        return apiResponse.successApiResponse(res, response, 'success', 200);
      })
      .catch((error) => {
        console.error('Cache data read error : '.error);

        return apiResponse.errorApiResponse(res, error, 'error', 404);
      });
  } catch (error) {
    return apiResponse.authErrorApiResponse(res, {}, 'Invalid request', 400);
  }
};

exports.createAndUpdateByKey = async (req, res) => {
  const { body } = req;

  return await cacheDataService
    .createAndUpdateByKey(body)
    .then((response) => {
      return apiResponse.successApiResponse(res, response, 'success', 201);
    })
    .catch((error) => {
      console.error('createAndUpdateByKey error : '.error);

      return apiResponse.errorApiResponse(res, error, 'error', 404);
    });
};
