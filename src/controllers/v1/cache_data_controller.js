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

// exports.pushEvents = async (req, res) => {
//   const { body } = req;

//   await spiService
//     .pushEventsToQueue(body)
//     .then((response) => {
//       return apiResponse.successApiResponse(res, response, 'success', 201);
//     })
//     .catch((err) => {
//       console.error('Notifications push error : '.err);

//       return new NotificationErrors(res, 'Error occurred while processing the request.', 400, err);
//     });
// };
