const router = require('express').Router();

router.route('/').get((req, res) => {
    Excercise.find()
        .then(excercises => res.json(excercises))
        .catch(err => res.status(400).json(`Error ${err}`));
});

module.exports = router;