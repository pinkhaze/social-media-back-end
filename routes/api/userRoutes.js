const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController')

// /api/users routes
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId routes
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
