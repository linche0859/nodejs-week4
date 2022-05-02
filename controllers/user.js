const User = require('../models/user');
const {
  getHttpResponseContent,
  getErrorMessage,
} = require('../utils/response');

const user = {
  register: async (req, res) => {
    try {
      const {
        body: { name, email, password },
      } = req;

      if (!(name || email || password)) throw '請填寫註冊資訊';
      if (name && name.length < 2)
        throw getErrorMessage({
          field: 'name',
          message: '暱稱至少 2 個字元以上',
        });
      if (password && password.length < 8)
        throw getErrorMessage({
          field: 'password',
          message: '密碼需至少 8 碼以上，並中英混合',
        });

      const exist = await User.findOne({ email });
      if (exist)
        throw getErrorMessage({
          field: 'email',
          message: '此 Email 已被註冊',
        });

      const user = await User.create({ name, email, password });
      res.json(getHttpResponseContent({ data: user }));
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json(getHttpResponseContent({ success: false, data: error }));
    }
  },
};

module.exports = user;
