const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./app/routes/routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet.noCache());
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());

app.use('/sury', routes);
const server = app.listen(process.env.PORT || 3000, () => {
  const { port } = server.address();
  console.log('App operating normally on port:', port);
});
