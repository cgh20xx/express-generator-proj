const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/test')
  .then(() => {
    console.log('mongodb 連接成功');
  })
  .catch((error) => console.log(error));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const postsRouter = require('./routes/posts');

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 這行會 parse body
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log('有人進來了');
  // noMethod();
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/posts', postsRouter);

// 處理錯誤路由
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: '無此頁面資訊',
  });
});

// 處理伺服器程式錯誤
app.use((err, req, res, next) => {
  const errMessage = err.message;
  res.status(500).json({
    status: 'error',
    message: '系統錯誤，請恰系統管理員',
    errMessage: errMessage,
  });
});

module.exports = app;
