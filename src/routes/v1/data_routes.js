/* Package imports */
const router = require('express').Router();

/* Middleware imports */
const validator = require('../../middleware/data_validator');
const { createAndUpdateByKey } = require('../../validations/data_validations');

/* Controller imports */
const cacheDataController = require('../../controllers/v1/cache_data_controller');

/* -- Routes -- */
/* Get all cached-keys */
router.get('/keys', cacheDataController.getAllKeys);
/* Get data by cache-key */
router.get('/by-key/:cache_key', cacheDataController.getCacheByKey);

/* Create a new record */
router.post('/', validator(createAndUpdateByKey, 'body'), cacheDataController.createAndUpdateByKey);

/* Delete a record by cache-key */
router.delete('/by-key/:cache_key', cacheDataController.deleteCacheByKey);
/* Clear all cached records */
router.delete('/all', cacheDataController.deleteAllCache);

module.exports = router;
