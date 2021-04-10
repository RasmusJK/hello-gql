// server.js
import {ApolloServer} from 'apollo-server-express';
import schemas from './schemas/index.js';
import resolvers from './resolvers/index.js';
import express from 'express';
import db from './db/db.js'
import {checkAuth} from "./passport/authenticate.js";

import localhost from "./security/localhost.js";
import production from "./security/production.js";




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

        process.env.NODE_ENV = process.env.NODE_ENV || 'development';
        if (process.env.NODE_ENV === 'production'){
            //TODO
            production(app,3000);
        } else{
            localhost(app,8000,3000);
        }

        /*  app.listen({port: 3000}, () =>
              console.log(
                  `🚀 Server ready at http://localhost:3000${server.graphqlPath}`),
          );
  */

        console.log(
            `Server ready at http://localhost:3000${server.graphqlPath}`);

    } catch (e) {
        console.log('server error: ' + e.message);
    }
})();
