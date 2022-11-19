/* Package imports */
const router = require('express').Router();

/* Middleware imports */
// const validator = require('../../middleware/data_validator');
// const { getCacheById } = require('../../validations/data_validations');

/* Controller imports */
const cacheDataController = require('../../controllers/v1/cache_data_controller');

/* Routes */
router.get('/:cache_key', cacheDataController.getCacheByKey);
// router.post('/', validator(getCache, 'body'), apiServiceController.pushEvents);

module.exports = router;
