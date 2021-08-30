const router = require('express').Router();

router.route('/movies')
    .get(function(req, res, next) {
        res.send("movies!");
    });

module.exports = router;