require('dotenv').config();
const http = require('http');

const port = process.env.PORT || 8069;

const app = require('./app');

const server = http.createServer(app);

server.listen(port);
console.log(`Listening to ${port}`);