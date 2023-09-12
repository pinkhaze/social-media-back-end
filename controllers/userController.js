const { User } = require('../models');

const userController = {
    // Get all users
    async getUsers(req, res) {
        try {
            const userData = await User.find({})
              .select('-__v');  // exclude version key
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId });

            if (!userData) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        } 
    },

    // Create a user
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.id },
            )

        } catch (err) {

        }
    }
}

module.exports = userController;