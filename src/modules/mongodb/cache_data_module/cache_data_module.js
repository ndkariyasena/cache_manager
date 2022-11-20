/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const { getConnection } = require('../../../configs/database/mongodb');

const { Schema } = mongoose;
const APP_VERSION = 'V1';
const DB_NAME = process.env.V1_DB_NAME;

const conn = getConnection(DB_NAME, APP_VERSION);

mongoose.connection = conn;

const ttlUpdate = (cacheData) => {
  const ttl = new Date();
  const { CACHE_DATA_TTL_NUMBER_OF_DAYS = 1 } = process.env;
  cacheData.ttl = ttl.setDate(new Date().getDate() + Number(CACHE_DATA_TTL_NUMBER_OF_DAYS));

  return cacheData;
};

/* Schema */
const cacheDataSchema = new Schema(
  {
    key: { type: String },
    cache_value: { type: String },
    ttl: { type: Number },
  },
  { timestamps: true }
);
/* -- */

cacheDataSchema.pre('save', async function dataTtlUpdate(next) {
  ttlUpdate(this);
  next();
});

cacheDataSchema.pre('findOneAndUpdate', async function dataTtlUpdate(next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  ttlUpdate(docToUpdate);
  next();
});

module.exports = mongoose.model('cache_data', cacheDataSchema);
