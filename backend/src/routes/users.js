const { Router } = require('express');
const router = Router();

const { createUser, deleteUser, getUsers} = require('../controllers/users.controller');

router.route('/')
    .get(getUsers)
    .post(createUser)

// localhost:4000/users/api/4
router.route('/:id')
    .delete(deleteUser)


module.exports = router;