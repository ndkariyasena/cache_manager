const { writeFileSync, mkdirSync, existsSync, readFileSync } = require('fs');

const { MAX_CACHE_RECORDS_COUNT = 10 } = process.env;

const CACHE_FILE_PATH = `${__dirname}/cache_data`;
const CACHE_FILE = `${CACHE_FILE_PATH}/cache.json`;

/**
 * Write data to the cache file
 *
 * @param {string} [fileContent='']
 * @return {Boolean}
 */
const writCacheIntoFile = async (fileContent = '') => {
  try {
    const data = typeof fileContent === 'string' ? fileContent : JSON.stringify(fileContent);

    if (!existsSync(CACHE_FILE_PATH)) await mkdirSync(CACHE_FILE_PATH);

    await writeFileSync(CACHE_FILE, data, 'utf8');

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Read data from the cache file
 *
 * @return {Object|null}
 */
const readCacheFile = async () => {
  if (!existsSync(CACHE_FILE_PATH)) return {};

  const data = await readFileSync(CACHE_FILE);
  return JSON.parse(data || {});
};

/**
 *
 *
 * @param {string} key
 * @return {object|null}
 */
const checkCacheKeys = async (key) => {
  if (!key || key === '') throw Error('Invalid key.');

  const cacheData = await readCacheFile();

  return cacheData[key];
};

/**
 * Count cache keys
 *
 * @return {number}
 */
const getAllKeys = async () => {
  const cacheData = await readCacheFile();

  return Object.keys(cacheData);
};

/**
 * Update cache keys in the file.
 * If the maximum amount of cached items is reached, function will sort all existing keys based on TTL value.
 * Then the object which contains the oldest TTL will be removed.
 *
 * @param {string} key
 * @param {any} data
 * @return {boolean}
 */
const updateKey = async (key, data) => {
  if (!key || key === '') throw Error('Invalid key.');

  const cacheData = await readCacheFile();

  /* Check the keys limit */
  if (Object.keys(cacheData).length >= Number(MAX_CACHE_RECORDS_COUNT)) {
    /* Sort keys based on the TTL */
    const sortedKeysArray = Object.keys(cacheData).sort((a, b) => cacheData[a].ttl - cacheData[b].ttl);
    /* Remove the oldest TTL object */
    delete cacheData[sortedKeysArray[0]];
  }

  cacheData[key] = data;

  await writCacheIntoFile(cacheData);

  return true;
};

/**
 * Delete object from the cache file, by using the cache-key
 *
 * @param {*} key
 * @return {boolean}
 */
const deleteKey = async (key) => {
  if (!key || key === '') throw Error('Invalid key.');

  const cacheData = await readCacheFile();

  delete cacheData[key];

  await writCacheIntoFile(cacheData);

  return true;
};

/**
 * Clear the cache file completely
 *
 * @return {boolean}
 */
const clearCache = async () => {
  await writCacheIntoFile({});

  return true;
};

module.exports = {
  writCacheIntoFile,
  readCacheFile,
  checkCacheKeys,
  getAllKeys,
  updateKey,
  deleteKey,
  clearCache,
};
