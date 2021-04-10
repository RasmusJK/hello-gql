import {AuthenticationError} from 'apollo-server-express';
import {login} from '../passport/authenticate.js';
import bcrypt from "bcrypt";
import User from '../models/user.js'


export default {
    Query: {
        user: async (parent, args, {user}) => {
            console.log('userResolver', user);
            // find user by id
        },
        login: async (parent, args, {req, res}) => {
            // inject username and password to req.body for passport
            console.log(args);
            req.body = args;
            try {
                const authResponse = await login(req, res);
                console.log('authResponse', authResponse);
                return {
                    id: authResponse.user.id,
                    username: authResponse.user.username,
                    token: authResponse.token,
                };
            } catch (e) {
                throw new AuthenticationError('invalid credentials');
            }
        },
    },
    Mutation: {
        register: async (parent, args) => {
            try {
                const hash = await bcrypt.hash(args.password, 12);
                const userWithHash = {
                    ...args,
                    password: hash,
                };
                const newUser = new User(userWithHash);
                const result = await newUser.save();
                return result;
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};