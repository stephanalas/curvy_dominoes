const express = require('express');
const morgan = require('morgan');
const path = require('path');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

const app = express();
app.use(connectLiveReload());
app.use(morgan('dev'));
app.use(express.static('public'));
app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
);
module.exports = app;
