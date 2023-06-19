import {Request, Response, NextFunction} from 'express';

function responseJson(res: Response, error: number, description: string) {
    res.json({error: error, description: description});
}

const roleRequired = (roles: string[]) => (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;
    if (!user) {
        responseJson(res, 500, 'user unauthorized');
        return;
    }

    if (!roles.every(role => user.roles.includes(role))) {
        responseJson(res, 500, 'The user does not have permission');
        return;
    }

    next();
};

export default roleRequired;