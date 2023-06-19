import {Request, Response, NextFunction} from 'express';
import {JwtPayload, verify} from "jsonwebtoken";
import env from "../env/envConfig";
import {User} from "../models";

function responseJson(res: Response, error: number, description: string) {
    res.clearCookie('jwt');
    res.json({error: error, description: description});
}

async function authRequired(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.cookies['jwt'];
    if (!token) {
        responseJson(res, 500, 'user unauthorized');
        return;
    }

    if (!req.user) {
        const payload = verify(token, env.JWT_SECRET_KEY) as JwtPayload;
        if (!payload) {
            responseJson(res, 500, 'user data is invalid');
            return;
        }

        const user = await User.findOne({username: payload.username});
        if (!user) {
            responseJson(res, 500, `user with username ${payload.username} doesn't exists`);
            return;
        }

        if (!user.checkPassword(payload.password)) {
            responseJson(res, 500, 'invalid password');
            return;
        }

        req.user = user;
    }

    next();
}

export default authRequired;