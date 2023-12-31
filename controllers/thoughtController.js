const { User, Thought } = require('../models');

// /api/thoughts
module.exports = {
    // GET to find all thoughts
    async getThoughts(req, res) {
        try {
            const thoughtData = await Thought.find()
              .select('-__v');  // exclude version key
            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // GET to find a single thought by its _id
    async getSingleThought(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
               .select('-__v');  // exclude version key

            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        } 
    },
    // POST to create a new thought 
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            // add thought to associated user 
            const userData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughtData._id } },
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
    // PUT to update a thought by its _id
    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidator: true, new: true }
            );

            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE to remove a thought by its _id
    async deleteThought(req, res) {
        try {
          const thoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
    
          if (!thoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
    
          res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async createReaction(req, res) {
        try {
            const reactionData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { runValidator: true, new: true }
            );
            
            if (!reactionData) {
                return res.status(404).json({ message: 'Found no thought with that ID' });
            }
            
            res.json('Added a reaction');
        }   catch (err) {
            res.status(500).json(err);
        }
    },

      async deleteReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $pull: { reactions: { _id: req.params.reactionId }}},
                { runValidator: true, new: true }
            );

            if (!thoughtData) {
                return res.status(404).json({ message: 'Found no reaction with that ID '});
            }
            res.json('Deleted a reaction')
        }   catch (error) {
            res.status(500).json(err);
        }
      }

      



}