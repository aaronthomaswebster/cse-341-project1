const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

console.log('userRoutes Requrieed')

router.get('/', userController.getAll);
router.get('/:id', userController.getSingle);

module.exports = router;