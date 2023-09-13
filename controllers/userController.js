const { User, Thought } = require('../models');

const userController = {
    // GET to find all users
    async getUsers(req, res) {
        try {
            const userData = await User.find({})
              .select('-__v');  // exclude version key
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // GET to find a single user by its _id
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
    // POST to create a new user
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // PUT to update a user by its _id
    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body }, // replace found user data with req.body
                { runValidator: true, new: true }
            );

            if (!userData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE to remove a user by its _id
    async deleteUser(req, res) {
        try {
          const userData = await User.findOneAndRemove({ _id: req.params.userId });
          
    
          if (!userData) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
          // remove thoughts associated with deleted user
          await Thought.deleteMany({ _id: { $in: userData.thoughts }})
          
    
          res.json({ message: 'User and their thoughts successfully deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },
}

module.exports = userController;