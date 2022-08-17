const router = require('express').Router();
const UserController = require('../controllers/user.controller')


// User Routes
router.post('/user', UserController().add)
    .get('/user', UserController().getAllUsers)
    .get('/user/:id', UserController().getUserById)
    .put('/user', UserController().updateUserById)
    .delete('/user/:id', UserController().deleteUserById)


module.exports = router