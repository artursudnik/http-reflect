"use strict";

const bodyParser = require('body-parser'),
      express    = require('express');

const logger = require('./lib/logger');

const app = express();

module.exports = app;

app.set('json spaces', 4);
app.set('etag', false);

app.get('/favicon.ico', (req, res) => {
    res.send(404);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.raw());

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');

    const response = {
        received: new Date().toISOString(),
        request:  {
            method:         req.method,
            path:           req.path,
            uri:            req.originalUrl,
            headers:        req.headers,
            queryParametrs: req.query,
            body:           req.body
        }
    };

    logger.log(JSON.stringify(response));

    res.send(response);
});