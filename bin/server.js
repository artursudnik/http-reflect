"use strict";

const app  = require('../app'),
      http = require('http');

const logger = require('../lib/logger');

const PORT = process.env.WEBSERVER_PORT || 3000;
const HOST = process.env.WEBSERVER_BIND || '127.0.0.1';

const server = http.createServer()
    .on('error', err => {
        logger.error(`${err}`);
    })
    .on('listening', () => {
        logger.info(`running on http://${HOST}:${PORT}`);
    })
    .on('request', app);

const WEBSERVER_TIMEOUT           = parseInt(process.env.WEBSERVER_TIMEOUT) || 1000;
const WEBSERVER_HEADERS_TIMEOUT   = parseInt(process.env.WEBSERVER_HEADERS_TIMEOUT) || 2000;
const WEBSERVER_KEEPALIVE_TIMEOUT = parseInt(process.env.WEBSERVER_KEEPALIVE_TIMEOUT) || 1000;

logger.info(`setting connections timeout to ${WEBSERVER_TIMEOUT} ms`);
logger.info(`setting keepalive timeout to ${WEBSERVER_KEEPALIVE_TIMEOUT} ms`);
logger.info(`setting headers timeout to ${WEBSERVER_HEADERS_TIMEOUT} ms`);

server.keepAliveTimeout = WEBSERVER_KEEPALIVE_TIMEOUT;
server.timeout          = WEBSERVER_TIMEOUT;
server.headersTimeout   = WEBSERVER_HEADERS_TIMEOUT;

server.listen(PORT, HOST);