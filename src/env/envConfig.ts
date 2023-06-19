import {load} from "ts-dotenv";

const env = load({
    PORT: Number,
    JWT_SECRET_KEY: String,
    API_VERSION: String
});

export default env;