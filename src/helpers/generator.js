exports.generateRandomWords = (content_length = 10) => {
  const RANDOM_WORDS_LIST = [
    'cultured',
    'realize',
    'profit',
    'illustrious',
    'rustic',
    'abounding',
    'inject',
    'street',
    'decay',
    'pear',
    'pets',
    'equal',
    'breakable',
    'tomatoes',
    'handsome',
    'magenta',
    'strap',
    'homeless',
    'wretched',
    'slap',
  ];

  let output = '';

  for (let index = 0; index < content_length; index++) {
    output += ` ${RANDOM_WORDS_LIST[Math.floor(Math.random() * RANDOM_WORDS_LIST.length)]}`;
  }

  return output;
};

exports.generateNextTtl = (cacheData = { ttl: '' }) => {
  const data = { ...cacheData };
  const ttl = new Date();
  const tomorrow = new Date();
  const { CACHE_DATA_TTL_NUMBER_OF_DAYS = 1 } = process.env;

  data.ttl = ttl.setDate(tomorrow.getDate() + Number(CACHE_DATA_TTL_NUMBER_OF_DAYS));

  return data.ttl;
};
