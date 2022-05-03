const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = {
  content: {
    type: String,
    required: [true, '請填寫貼文內容'],
  },
  image: {
    type: String,
    default: '',
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: {
    type: Date,
    default: Date.now,
  },
};

module.exports = mongoose.model('Post', schema);
