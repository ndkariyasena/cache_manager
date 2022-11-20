const mongoose = require('mongoose');

const { getConnection } = require('../../../configs/database/mongodb');
const { generateNextTtl } = require('../../../helpers/generator');

const { Schema } = mongoose;
const APP_VERSION = 'V1';
const DB_NAME = process.env.V1_DB_NAME;

const conn = getConnection(DB_NAME, APP_VERSION);

mongoose.connection = conn;

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
  this.ttl = generateNextTtl(this);
  next();
});

module.exports = mongoose.model('cache_data', cacheDataSchema);
