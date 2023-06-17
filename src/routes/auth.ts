import {Router} from "express";
import JwtPipeline, {addJwtOptionalKey} from "../jwt/JwtPipeline";
import {hash} from "bcrypt";

const router = Router();

// Add optional fields to the pipeline
addJwtOptionalKey(['username', 'password']);

router.post('/reg', async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        res.json({error: 1, description: 'username or password is undefined or null'});
        return;
    }

    const jwtPipe = new JwtPipeline();
    jwtPipe.addPayloadField('username', username);
    jwtPipe.addPayloadField('password', await hash(password, 12));

    res.cookie('jwt', jwtPipe.getJwt());

    res.sendStatus(200);
});

router.post('/login', (req, res) => {

});

export default router;