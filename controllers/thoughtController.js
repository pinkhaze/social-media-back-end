const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughtData = await Thought.find()
              .select('-__v');  // exclude version key
            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
               .select('-__v');  // exclude version key

            if (!thoughtData) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        } 
    },

    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);

            const userData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: Thought._id } },
                { new: true },
            )

            if(!userData) {
                return res.status(404).json({ message: 'Created thought, but found no user with that ID'})
            }
            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        } 
    },

    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidator: true, new: true }
            );

            if (!thoughtData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

}