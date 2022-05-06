const User = require('../models/user');
const {
  getHttpResponseContent,
  getErrorMessage,
} = require('../utils/response');

const user = {
  register: async (req, res) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.summary = '註冊會員'
     */
    /**
      #swagger.parameters['parameter_name'] = {
        in: 'body',
        description: '會員資料',
        schema: {
          $name: '暱稱',
          $email: 'test@gmail.com',
          $password: '123456',
        }
      }
     */
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
          message: '密碼需至少 8 碼以上，並英數混合',
        });

      const exist = await User.findOne({ email });
      if (exist)
        throw getErrorMessage({
          field: 'email',
          message: '此 Email 已被註冊',
        });

      const user = await User.create({ name, email, password });
      /**
        #swagger.responses[200] = {
          description: '註冊會員成功',
          schema: { $ref: '#/definitions/Users' }
        }
     */
      res.status(200).json(getHttpResponseContent({ data: user }));
    } catch (error) {
      /**
        #swagger.responses[400] = {
          description: '註冊會員失敗',
          schema: { $ref: '#/definitions/Error' }
        }
     */
      res
        .status(400)
        .json(getHttpResponseContent({ success: false, data: error }));
    }
  },
};

module.exports = user;
