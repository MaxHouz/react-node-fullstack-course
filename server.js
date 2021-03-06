import config from './config';
import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';
import bodyParser from 'body-parser';
import path from 'path';

import express from 'express';
const server = express();
import serverRender from "./serverRender";

server.use(bodyParser.json());
server.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public')
}));
server.set('view engine', 'ejs');

server.get(['/', '/contest/:contestId'], (req, res) => {
    serverRender(req.params.contestId)
        .then(({ initialMarkup, initialData }) => {
            res.render('index', {
                initialData,
                initialMarkup
            });
        })
        .catch(error => {
            console.error(error);
            res.status(404).send('Wrong contest id');
        })
});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, config.host, () => {
   console.log('Express listening on port ', config.port);
});