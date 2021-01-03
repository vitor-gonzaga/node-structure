const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

module.exports = (app) => {
  app.use(helmet());
  app.use(morgan(process.env.MORGANLOGLEVEL));
  app.use(cors());
  app.use(bodyParser.json());
};
