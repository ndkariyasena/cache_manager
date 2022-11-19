/* Package imports */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const cacheDataRoutes = require('./routes/v1/data_routes');

const { JSON_PARSER_LIMIT, PORT, HOST, APP_NAME } = process.env;
const ApplicationName = APP_NAME.replace(/^./, APP_NAME[0].toUpperCase());

const app = express();

app.use(
  cors({
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json({ limit: JSON_PARSER_LIMIT, extended: true }));

/* Routes define */
app.use('/v1/cache', cacheDataRoutes);

app.get('/', (req, res) => res.json({ api: `Welcome to the ${ApplicationName} service` }));

/* Server start */
app.listen(PORT, HOST, (error) => {
  if (error) console.log('*** Server start failed! *** ', error);
  else {
    console.log(
      `\n/------------/\n"${ApplicationName}" server start running on http://${HOST}:${PORT}\n/------------/\n`
    );
  }
});
