const { v4: UUID_v4 } = require('uuid');

const { filterDataFoResponse } = require('../../helpers/data_filters');
const { checkCacheKeys, getAllKeys } = require('../../configs/caching');
const { findOneByQuery, createNewCache } = require('../../modules/mongodb/cache_data_module');

exports.getCacheByKey = async (cache_key) => {
  try {
    if (!cache_key || cache_key === '') throw Error('Valid cache_key not found');

    let cacheData = null;
    const cacheKey = await checkCacheKeys(cache_key);

    if (!cacheKey) {
      console.log('Cache miss');

      cacheData = await createNewCache({ key: UUID_v4(), cache_value: 'test' });
    } else {
      console.log('Cache hit');
      cacheData = await findOneByQuery({ key: cache_key });
    }

    return filterDataFoResponse(cacheData);
  } catch (error) {
    console.error('Error in getCacheByKey service layer');
    console.error(error);
    throw error;
  }
};

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
