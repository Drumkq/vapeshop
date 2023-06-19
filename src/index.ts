import express, {json, urlencoded} from 'express';
import {auth} from "./routes";
import cookieParser from "cookie-parser";
import * as mongoose from "mongoose";
import {authRequired} from "./middleware";
import products from "./routes/products";
import env from "./env/envConfig";

async function main() {
    const app = express();
    app.use(json());
    app.use(urlencoded({extended: true}));
    app.use(cookieParser());

    const apiPrefix = `/api/v${env.API_VERSION}`;

    app.use(apiPrefix, auth);
    app.use(authRequired);
    app.use(apiPrefix, products);

    await mongoose.connect('mongodb://localhost:27017/vapeshop').then(() => console.log('Database connected'));

    app.listen(3000, () => {
        console.log('Server works');
    });
}

main().catch(console.error);