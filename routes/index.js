const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const YAML = require('yaml')

const file  = fs.readFileSync('./.rest', 'utf8')
const swaggerDocument = YAML.parse(file)

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));


router.use('/users', require('./users.js'));

module.exports = router;