import express, {json, urlencoded} from 'express';
import {auth} from "./routes";
import * as mongoose from "mongoose";

async function main() {
    const app = express();
    app.use(json());
    app.use(urlencoded({extended: true}));
    app.use('/api/v1', auth);

    await mongoose.connect('mongodb://localhost:27017/products').then(() => console.log('Database connected'));

    app.listen(3000, () => {
        console.log('Server works');
    });
}

main().catch(console.error);