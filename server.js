process.on('uncaughtException', (err) => {
  console.log('Uncaught exception');
  console.log(err.name, err.message);
  console.log(err);
  process.exit(1);
});

const app = require('./app');

const port = 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

const http = require('http').Server(app);
const socketManager = require('./utils/socketManager')(http, server);

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection. Shutting down.');
  server.close(() => {
    process.exit(1);
  });
});
