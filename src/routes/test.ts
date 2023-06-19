import {Router} from "express";

const router = Router();

router.get('/hello', (req, res) => {
    res.json('Hello, World!');
});

export default router;