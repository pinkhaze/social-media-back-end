const { Schema, model } = require('mongoose');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => new Date(timestamp).toISOString(),
    },
    username: {
        type: String,
        required: true,
    },
    //reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,   // include virtuals with response
      getters: true,  
    },
    id: false
  }
);

// Virtual property that gets the length of the user's 'friends' array field
// thoughtSchema
//   .virtual('reactionCount')
//   // Getter
//   .get(function() {
//     return this.reactions.length;
//   });

// Initialize the Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
