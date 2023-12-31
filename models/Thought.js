const { Schema, model } = require('mongoose');

// define shape for reaction subdocument
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId,
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => new Date(timestamp).toISOString(),
    },
  }
)

// schema to create Thought model
// defines shape for parent document
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

    // include an array that holds all the reactions' information
    reactions: [reactionSchema],
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
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function() {
    return this.reactions.length;
  });

// Initialize the Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
