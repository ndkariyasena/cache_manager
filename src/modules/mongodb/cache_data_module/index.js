const { updateKey } = require('../../../configs/caching');
const { filterDataFoCaching } = require('../../../helpers/data_filters');
const { generateNextTtl } = require('../../../helpers/generator');
const Schema = require('./cache_data_module');

/* Helpers */

/**
 * Reset document TTL values on every read
 *
 * @param {*} query
 * @return {object}
 */
const updateTtlAfterRead = async (query) => {
  const update = { ttl: generateNextTtl() };
  return await Schema.findOneAndUpdate(query, update);
};
/* Helpers END */

/**
 * Create a new record in the database.
 * After creating record cache data file fill update too
 *
 * @param {object} payload
 * @return {object}
 */
const createNewCache = async (payload) => {
  const data = await Schema.create(payload);

  const dataToCache = filterDataFoCaching(data);
  await updateKey(dataToCache.cache_key, dataToCache.data);

  return data;
};

/**
 * Find a document query
 *
 * @param {object} query
 * @param {object} [fields={}]
 * @return {object}
 */
const findOneByQuery = async (query, fields = {}) => {
  const data = await Schema.findOne(query, fields);
  if (data) updateTtlAfterRead(query);

  return data;
};

/**
 * Get a record by ID
 *
 * @param {string} _id
 * @return {object}
 */
const findById = async (_id) => {
  const data = await Schema.findById(_id);
  if (data) updateTtlAfterRead({ _id });

  return data;
};

/**
 * Find a document by ID and remove
 *
 * @param {string} id
 */
const findByIdAndRemove = async (id) => await Schema.findOneAndRemove({ _id: id });

/**
 * Delete many records
 *
 * @param {object} query
 */
const deleteManyRecords = async (query = {}) => {
  if (Object.keys(query).length === 0) throw Error('Empty query found');
  return await Schema.remove(query);
};

/**
 * Truncate the collection
 *
 */
const truncateCollection = async () => await Schema.remove({});

module.exports = {
  createNewCache,
  findOneByQuery,
  findByIdAndRemove,
  deleteManyRecords,
  truncateCollection,
  findById,
};
