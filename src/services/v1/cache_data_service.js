const { v4: UUID_v4 } = require('uuid');

const { filterDataFoResponse } = require('../../helpers/data_filters');

const { findOneByQuery, createNewCache } = require('../../modules/mongodb/cache_data_module');

exports.getCacheByKey = async (cache_key) => {
  try {
    if (!cache_key || cache_key === '') throw Error('Valid cache_key not found');

    let cacheData = await findOneByQuery({ key: cache_key });

    if (!cacheData) {
      console.log('Cache miss');

      cacheData = await createNewCache({ key: UUID_v4(), cache_value: 'test' });
    } else {
      console.log('Cache hit');
    }

    return filterDataFoResponse(cacheData);
  } catch (error) {
    console.error('Error in getCacheByKey service layer');
    console.error(error);
    throw error;
  }
};
