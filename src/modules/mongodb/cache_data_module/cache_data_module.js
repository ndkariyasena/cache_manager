/* eslint-disable no-param-reassign */
/* cSpell:ignore upsert */
/* Counters handling */
/* This collection will keep records of all the key object types latest count */
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
  cacheData.ttl = ttl.setDate(new Date().getDate() + CACHE_DATA_TTL_NUMBER_OF_DAYS);

  return cacheData;
};

/* Schema */
const cacheDataSchema = new Schema(
  {
    // _id: { type: String },
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
  ttlUpdate(this);
  console.log(docToUpdate); // The document that `findOneAndUpdate()` will modify
  next();
});

// eslint-disable-next-line func-names
cacheDataSchema.statics.getNextSequence = async function (counterName) {
  if (!counterName) return null;

  const ret = await this.findOneAndUpdate(
    { _id: counterName },
    { $inc: { seq: 1 } },
    {
      new: true,
      upsert: true,
    }
  );

  return ret.seq.toString().padStart(6, '0');
};

module.exports = mongoose.model('cache_data', cacheDataSchema);
