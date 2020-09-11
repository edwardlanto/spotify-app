const router = require('express').Router();

    router.route('/').get((req, res) => {
        res.send('TEST');
    });

module.exports = router;