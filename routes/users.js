const express = require('express');

const router = express.Router();

const UserController = require('../controllers/UserController');

const { createUserValidationRules, validate } = require('../middleware/CreateUserMiddleware');

const { authenticate } = require('../middleware/AuthMiddleware');

/* GET user  */
router.get('/', authenticate, UserController.auth);

/* POST user: user creation route */
router.post('/', createUserValidationRules(), validate, UserController.register);

/* POST user login */
router.post('/login', UserController.login);


module.exports = router;
