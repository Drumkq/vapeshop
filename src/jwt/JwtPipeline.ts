import {sign, SignOptions} from "jsonwebtoken";
import env from "../env/envConfig";

const OptionalFields: string[] = [];

function addJwtOptionalKey(keys: string[]) {
    Array.prototype.push.apply(OptionalFields, keys);
}

class JwtPipeline {
    private jwtPayload: { [k: string]: unknown };

    public constructor() {
        this.jwtPayload = {};
    }

    public getJwt(options?: SignOptions): string {
        for (const optionalField of OptionalFields) {
            if (!this.jwtPayload[optionalField]) {
                throw new Error('Pipeline is missing optional fields');
            }
        }

        const token = sign(this.jwtPayload, env.JWT_SECRET_KEY, options);
        this.jwtPayload = {};

        return token;
    }

    public addPayloadField(key: string, value: unknown): void {
        this.jwtPayload[key] = value;
    }
}

export default JwtPipeline;

export {
    addJwtOptionalKey
};