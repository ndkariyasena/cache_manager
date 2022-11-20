const { v4: UUID_v4 } = require('uuid');

const { filterDataFoResponse } = require('../../helpers/data_filters');
const { generateRandomWords } = require('../../helpers/generator');
const { checkCacheKeys, getAllKeys, deleteKey, clearCache } = require('../../configs/caching');
const {
  createNewCache,
  findByIdAndRemove,
  truncateCollection,
  findById,
} = require('../../modules/mongodb/cache_data_module');

/**
 * Get cache by cache-key logic handler
 *
 * @param {object} payload
 * @return {object}
 */
exports.getCacheByKey = async (cache_key) => {
  try {
    if (!cache_key || cache_key === '') throw Error('Valid cache_key not found');

    let data = null;
    /* Check key in the cache file */
    let cacheData = await checkCacheKeys(cache_key);

    /* validate data */
    if (!cacheData || new Date(cacheData.ttl) < new Date()) {
      console.log('Cache miss');

      /* Create a new record */
      data = await createNewCache({ key: UUID_v4(), cache_value: generateRandomWords() });
      /* Delete the old record */
      deleteKey(cache_key);
      cacheData = null;
    } else {
      console.log('Cache hit');
      /* Get data from the database */
      data = await findById(cacheData.id);
    }

    /* Filter data and send */
    return { data: filterDataFoResponse(data), status: cacheData ? 200 : 201 };
  } catch (error) {
    console.error('Error in getCacheByKey service layer');
    console.error(error);
    throw error;
  }
};

/**
 * Get all cached keys list
 *
 * @param {object} payload
 * @return {object}
 */
exports.getAllCachedKeys = async () => {
  try {
    const allKeys = await getAllKeys();

    return { cache_keys: allKeys };
  } catch (error) {
    console.error('Error in getAllCachedKeys service layer');
    console.error(error);
    throw error;
  }
};

/**
 * Create a new record in the database.
 *
 * @param {object} payload
 * @return {object}
 */
exports.createAndUpdateByKey = async (data) => {
  try {
    const cacheData = await createNewCache(data);

    return filterDataFoResponse(cacheData);
  } catch (error) {
    console.error('Error in getAllCachedKeys service layer');
    console.error(error);
    throw error;
  }
};

/**
 * Delete a record by cache-key
 *
 * @param {object} payload
 * @return {object}
 */
exports.deleteCacheByKey = async (cache_key) => {
  try {
    if (!cache_key || cache_key === '') throw Error('Valid cache_key not found');

    const cacheKeyData = await checkCacheKeys(cache_key);

    if (cacheKeyData) {
      await findByIdAndRemove(cacheKeyData.id);

      await deleteKey(cache_key);
    }

    return true;
  } catch (error) {
    console.error('Error in getCacheByKey service layer');
    console.error(error);
    throw error;
  }
};

/**
 * Clear all cached records.
 *
 * @param {object} payload
 * @return {object}
 */
exports.deleteAllCacheRecords = async () => {
  try {
    await truncateCollection();
    clearCache();

    return true;
  } catch (error) {
    console.error('Error in getCacheByKey service layer');
    console.error(error);
    throw error;
  }
};
