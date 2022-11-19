const { updateKey } = require('../../../configs/caching');
const { filterDataFoCaching } = require('../../../helpers/data_filters');
const Schema = require('./cache_data_module');

// const SEQUENCE = 'BEST-PHOTOS';

/**
 *
 *
 * @param {*} payload
 * @returns
 */
const createNewCache = async (payload) => {
  const data = await Schema.create(payload);

  const dataToCache = filterDataFoCaching(data);
  await updateKey(dataToCache.cache_key, dataToCache.data);

  return data;
};

/**
 *
 *
 * @param {*} query
 * @param {*} [fields={}]
 */
const findOneByQuery = async (query, fields = {}) => await Schema.findOne(query, fields);

/**
 *
 *
 * @param {*} query
 * @param {*} options
 * @param {*} [fields={}]
 * @returns
 */
const findByQuery = async (query, options = null, fields = {}) => {
  const users = Schema.find(query, fields);

  if (options && options.sort) users.sort(options.sort);

  if (options && options.limit > 0) users.limit(options.limit);

  return await users;
};

/**
 *
 *
 * @param {*} query
 * @param {*} updates
 * @param {*} [options={}]
 */
const findOneByQueryAndUpdate = async (query, updates, options = {}) =>
  await Schema.findOneAndUpdate(query, updates, options);

module.exports = {
  createNewCache,
  findOneByQuery,
  findByQuery,
  findOneByQueryAndUpdate,
};
