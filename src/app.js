const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const { finished } = require('stream');
const fs = require('fs');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const logs = path.join(__dirname, 'access.log');
const errors = path.join(__dirname, 'errors.log');

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use((req, res, next) => {
  const { method, url, body } = req;
  const start = Date.now();
  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    const date = new Date(start);
    const data = `${date} ${method} ${url} ${JSON.stringify(
      body
    )} ${statusCode} [${ms}ms]\n`;
    console.log(data);
    fs.appendFile(logs, data, err => {
      if (err) {
        console.log("Can't input logs to access.log");
      }
    });
  });
  next();
  return;
});

app.use((err, req, res, next) => {
  const errMessage = res
    .status(INTERNAL_SERVER_ERROR)
    .send(getStatusText(INTERNAL_SERVER_ERROR));
  const start = Date.now();
  const date = new Date(start);
  const data = `${errMessage}; ${date} \n`;
  fs.appendFile(errors, data, error => {
    if (error) {
      console.log("Can't input logs to errors.log");
    }
  });
  next(err);
  return;
});

process.on('uncaughtException', err => {
  const start = Date.now();
  const date = new Date(start);
  const data = `${err.message}; ${date} \n`;
  console.error(`captured error: ${data}`);
  fs.appendFile(errors, data, error => {
    if (error) {
      console.log("Can't input logs to errors.log");
    }
  });
});

process.on('unhandledRejection', err => {
  const start = Date.now();
  const date = new Date(start);
  const data = `${err.message}; ${date} \n`;
  console.error(`captured error: ${data}`);
  fs.appendFile(errors, data, error => {
    if (error) {
      console.log("Can't input logs to errors.log");
    }
  });
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

module.exports = app;
