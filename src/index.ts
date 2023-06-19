import express, {json, urlencoded} from 'express';
import {auth} from "./routes";
import cookieParser from "cookie-parser";
import * as mongoose from "mongoose";
import {authRequired, roleRequired} from "./middleware";
import test from "./routes/test";

async function main() {
    const app = express();
    app.use(json());
    app.use(urlencoded({extended: true}));
    app.use(cookieParser());
    app.use('/api/v1', auth);
    app.use(authRequired);
    app.use(roleRequired(['USER', 'FOO']));
    app.use('/api/v1', test);

    await mongoose.connect('mongodb://localhost:27017/vapeshop').then(() => console.log('Database connected'));

    app.listen(3000, () => {
        console.log('Server works');
    });
}

main().catch(console.error);