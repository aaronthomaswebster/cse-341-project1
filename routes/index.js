const router = require('express').Router();

router.use('/', require('./swagger.js'));
router.use('/users', require('./users.js'));

module.exports = router;