import 'reflect-metadata';
import 'dotenv-safe/config';
import { UserResolver } from './resolvers/user';
import { User } from './entities/User';
import { Post } from './entities/Post';
import { PostResolver } from './resolvers/post';
import { __prod__ } from './constants';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import path from 'path';

const main = async () => {
    const conn = await createConnection({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        logging: true,
        // synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: [Post, User],
    });
    await conn.runMigrations();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver, UserResolver],
            validate: false,
        }),
        context: () => ({}),
    });

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
};

main().catch((err) => {
    console.error(err);
});
