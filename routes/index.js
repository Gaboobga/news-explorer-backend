const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const { validateSignup, validateSignin } = require('../middlewares/validation');

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);

module.exports = router;