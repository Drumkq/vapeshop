import {IUser} from "../models";

declare module 'Express' {
    export interface Request {
        user?: IUser
    }
}
