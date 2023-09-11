const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,   // remove leading and trailing white space
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: Thought,
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: User,
        }
    ],
  },
  {
    toJSON: {
      virtuals: true,   // include virtuals with response
    },
    id: false
  }
);

// Virtual property that gets the length of the user's 'friends' array field
userSchema
  .virtual('friendCount')
  // Getter
  .get(function() {
    return this.friends.length;
  });

// Initialize the User model
const User = model('user', userSchema);

module.exports = User;
