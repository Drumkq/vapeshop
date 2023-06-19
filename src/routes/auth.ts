import {Router} from "express";
import JwtPipeline, {addJwtOptionalKey} from "../jwt/JwtPipeline";
import {User} from "../models";
import {compare} from "bcrypt";

const router = Router();

// Add optional fields to the pipeline
addJwtOptionalKey(['username', 'password']);

router.post('/reg', async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        res.json({error: 1, description: 'username or password is undefined or null'});
        return;
    }

    const user = await User.create({username, password});

    const jwtPipe = new JwtPipeline();
    jwtPipe.addPayloadField('username', user.username);
    jwtPipe.addPayloadField('password', user.password);

    res.cookie('jwt', jwtPipe.getJwt());
    res.sendStatus(200);
});

router.post('/login', async (req, res) => {
    if (req.cookies['jwt']) {
        res.json({error: 1, description: 'user already logged in'});
        return;
    }

    const {username, password} = req.body;

    if (!username || !password) {
        res.json({error: 1, description: 'username or password is undefined or null'});
        return;
    }

    const user = await User.findOne({username});

    if (!user) {
        res.json({error: 1, description: 'user with this username doesn\'t exists'});
        return;
    }

    if (!await compare(password, user.password)) {
        res.json({error: 1, description: 'invalid password'});
        return;
    }

    const jwtPipe = new JwtPipeline();
    jwtPipe.addPayloadField('username', user.username);
    jwtPipe.addPayloadField('password', user.password);

    res.cookie('jwt', jwtPipe.getJwt());
    res.sendStatus(200);
});

export default router;