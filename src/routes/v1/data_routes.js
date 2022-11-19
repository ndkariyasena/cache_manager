/* Package imports */
const router = require('express').Router();

/* Middleware imports */
const validator = require('../../middleware/data_validator');
const { createAndUpdateByKey } = require('../../validations/data_validations');

/* Controller imports */
const cacheDataController = require('../../controllers/v1/cache_data_controller');

/* Routes */
router.get('/keys', cacheDataController.getAllKeys);
router.get('/by-key/:cache_key', cacheDataController.getCacheByKey);

router.post('/', validator(createAndUpdateByKey, 'body'), cacheDataController.createAndUpdateByKey);

module.exports = router;
