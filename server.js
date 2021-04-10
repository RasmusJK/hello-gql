// server.js
import {ApolloServer} from 'apollo-server-express';
import schemas from './schemas/index.js';
import resolvers from './resolvers/index.js';
import express from 'express';
import db from './db/db.js'
import {checkAuth} from "./passport/authenticate.js";
import https from 'https';
import http from 'http';

import fs from 'fs';

const sslkey = fs.readFileSync('../ssl-key.pem');
const sslcert = fs.readFileSync('../ssl-cert.pem')

const options = {
    key: sslkey,
    cert: sslcert
};



(async () => {
    try {

        await db();

        const server = new ApolloServer({
            typeDefs: schemas,
            resolvers,
            context: async ({req, res}) => {
                if (req) {
                    const user = await checkAuth(req, res);
                    console.log('app', user);
                    return {
                        req,
                        res,
                        user,
                    };
                }
            },

        });

        const app = express();

        server.applyMiddleware({app});


      /*  app.listen({port: 3000}, () =>
            console.log(
                `🚀 Server ready at http://localhost:3000${server.graphqlPath}`),
        );
*/
        https.createServer(options, app).listen(8000);

        http.createServer((req, res) => {
            res.writeHead(301, { 'Location': 'https://localhost:8000' + req.url });
            res.end();
        }).listen(3000);
        console.log(
            `Server ready at http://localhost:3000${server.graphqlPath}`);


    } catch (e) {
        console.log('server error: ' + e.message);
    }
})();
