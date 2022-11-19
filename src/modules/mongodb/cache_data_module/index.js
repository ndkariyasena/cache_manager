// const { Counter } = require('@v1/module/counters');
const Schema = require('./cache_data_module');

// const SEQUENCE = 'BEST-PHOTOS';

/**
 *
 *
 * @param {*} payload
 * @returns
 */
const createNewCache = async (payload) => {
  return await Schema.create(payload);
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
