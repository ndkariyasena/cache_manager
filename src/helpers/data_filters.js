exports.filterDataFoResponse = (rawData) => {
  const data = JSON.parse(JSON.stringify(rawData));

  return {
    cache_key: data.key,
    value: data.cache_value,
    createdAt: data.createdAt,
  };
};
