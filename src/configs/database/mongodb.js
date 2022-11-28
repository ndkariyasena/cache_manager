const mongoose = require('mongoose');

const API_VERSIONS = process.env?.API_VERSIONS;

const DB_NAMES = API_VERSIONS ? API_VERSIONS.split(' ').map((version) => `${version}_DB_NAME`) : [];

const connections = [];

const throwError = (message) => {
  console.error(message);
  throw new Error(message);
};

const connect = (database, appVersion = null) => {
  const oldConnection = connections.find((c) => c.database === database);

  if (oldConnection) return oldConnection;

  if (!appVersion) throwError('App version not found for MongoDB connections');

  let dbURL = process.env[`${appVersion}_DB_URL`];

  if (!dbURL) {
    const HOST = process.env[`${appVersion}_DB_HOST`];

    const PORT = process.env[`${appVersion}_DB_PORT`];

    if (!HOST || HOST === '' || !PORT || PORT === '')
      throwError(`${appVersion} MongoDB connection parameters are missing`);

    dbURL = `mongodb://${HOST}:${PORT}/${database}`;
  }

  const connection = mongoose.createConnection(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connections.push({
    database,
    dbURL,
    conn: connection,
  });

  connection.on('connected', () => console.info('Connection is open to ', dbURL));

  connection.on('error', (err) => console.warn(`Connection has occurred ${err}error`));

  connection.on('disconnected', () => console.error('Connection is disconnected'));

  process.on('SIGINT', () => {
    connection.close(() => {
      console.warn('connection is disconnected due to application termination');

      process.exit(0);
    });
  });

  return connection;
};

const openConnections = (appVersion) => {
  const Db_prefix = `${appVersion}_`;

  const matches = DB_NAMES.filter((name) => name.match(Db_prefix));

  for (const name of matches) {
    connect(process.env[name], appVersion);
  }
};

const getConnection = (database, appVersion) => {
  if (database) {
    const connection = connections.find((c) => c.database === database);
    if (connection) return connection.conn;
  }

  return connect(database, appVersion);
};

module.exports = {
  connect,
  openConnections,
  getConnection,
};
