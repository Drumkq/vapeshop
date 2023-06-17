import {load} from "ts-dotenv";

const env = load({
    PORT: Number,
    JWT_SECRET_KEY: String
});

export default env;