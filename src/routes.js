import {Router} from 'express';

const router = Router();

router.route('/movies')
    .get(function(req, res) {
        res.send("movies!");
    });

export default router;