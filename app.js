const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
require('dotenv').config();
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');

//db connection
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true },
    { useCreateIndex: true }
  )
  .then(() => console.log('db connected'))
  .catch((err) => console.error(err));
//when error
mongoose.connection.on('error', (err) => {
  console.log(`DB connection error: ${err.message}`);
});

//midlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middleware
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', categoryRoute);
app.use('/api', productRoute);

//PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
