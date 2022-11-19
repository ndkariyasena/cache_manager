const { writeFileSync, mkdirSync, existsSync, readFileSync } = require('fs');

const CACHE_FILE_PATH = `${__dirname}/cache_data`;
const CACHE_FILE = `${CACHE_FILE_PATH}/cache.json`;

/**
 *
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
 *
 *
 * @return {Object|null}
 */
const readCacheFile = async () => {
  if (!existsSync(CACHE_FILE_PATH)) return {};

  const data = await readFileSync(CACHE_FILE);
  return JSON.parse(data);
};

const checkCacheKeys = async (key) => {
  if (!key || key === '') throw Error('Invalid key.');

  const cacheData = await readCacheFile();

  return cacheData[key];
};

const getAllKeys = async () => {
  const cacheData = await readCacheFile();

  return Object.keys(cacheData);
};

const updateKey = async (key, data) => {
  if (!key || key === '') throw Error('Invalid key.');

  const cacheData = await readCacheFile();

  cacheData[key] = data;

  await writCacheIntoFile(cacheData);

  return true;
};

module.exports = {
  writCacheIntoFile,
  readCacheFile,
  checkCacheKeys,
  getAllKeys,
  updateKey,
};
