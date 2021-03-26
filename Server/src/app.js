//Set up express server
const express = require('express');
const app = express();

//Set up mongoose
const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://localhost:27017/reader',
  // 'mongodb+srv://dan:' +
  //   process.env.MONGO_ATLAS_PW +
  //   '@reader.qzela.mongodb.net/<dbname>?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);
//Set up morgan middleware
const morgan = require('morgan'); //Middleware that adds logs
app.use(morgan('dev'));

//Set up body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); //Parse body from URLs
app.use(bodyParser.json()); //JSON parser

//Set up CORS Headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); //Let All Webpages access API
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); //Tell Browsers what options are available
    return res.status(200).json({});
  }
  next();
});

//Routes
const wordsRoutes = require('./modules/words/Routes');
const storyRoutes = require('./modules/story/Routes');
const userRoutes = require('./modules/user/Routes');

app.use('/words', wordsRoutes);
app.use('/story', storyRoutes);
app.use('/user', userRoutes);

//Error handling for when a route isn't found
app.use((req, res, next) => {
  const error = new Error('Route Not Found');
  error.status = 404;
  next(error);
});

//Returns an error for anything that doesn't work
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ message: error.message });
});

module.exports = app;
