const mongoose = require('mongoose');

const schema = {
  name: {
    type: String,
    required: [true, '請填寫暱稱'],
  },
  email: {
    type: String,
    required: [true, '請填寫 Email'],
  },
  password: {
    type: String,
    required: [true, '請填寫密碼'],
  },
  avatar: {
    type: String,
    default: '',
  },
  gender: {
    type: Boolean,
    default: true,
  },
};

module.exports = mongoose.model('User', schema);
