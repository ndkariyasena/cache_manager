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
      .then(({ data, status = 200 }) => {
        return apiResponse.successApiResponse(res, data, 'success', status);
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
 * Get all Keys request
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

/**
 * Create and update a cache by Key request
 * @param req
 * @param res
 */
exports.createAndUpdateByKey = async (req, res) => {
  try {
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
  } catch (error) {
    return apiResponse.authErrorApiResponse(res, {}, 'Invalid request', 400);
  }
};

/**
 * Delete a cache by Key request
 * @param req
 * @param res
 */
exports.deleteCacheByKey = async (req, res) => {
  try {
    const {
      params: { cache_key },
    } = req;

    return await cacheDataService
      .createAndUpdateByKey(cache_key)
      .then((response) => {
        return apiResponse.successApiResponse(res, response, 'success', 204);
      })
      .catch((error) => {
        console.error('deleteCacheByKey error : '.error);

        return apiResponse.errorApiResponse(res, error, 'error', 404);
      });
  } catch (error) {
    return apiResponse.authErrorApiResponse(res, {}, 'Invalid request', 400);
  }
};

/**
 * Delete all cache data request
 * @param req
 * @param res
 */
exports.deleteAllCache = async (req, res) => {
  try {
    return await cacheDataService
      .deleteAllCacheRecords()
      .then((response) => {
        return apiResponse.successApiResponse(res, response, 'success', 204);
      })
      .catch((error) => {
        console.error('deleteAllCache error : '.error);

        return apiResponse.errorApiResponse(res, error, 'error', 404);
      });
  } catch (error) {
    return apiResponse.authErrorApiResponse(res, {}, 'Invalid request', 400);
  }
};
