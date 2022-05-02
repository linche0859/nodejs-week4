const Post = require('../models/post');
const {
  getHttpResponseContent,
  getErrorMessage,
} = require('../utils/response');

const post = {
  // 取得貼文
  getPosts: async (req, res) => {
    const {
      query: { q, sort = 'desc' },
    } = req;
    const filter = q ? { content: new RegExp(q, 'i') } : {};
    const posts = await Post.find(filter)
      .populate({ path: 'user', select: 'name avatar' })
      .sort({
        createdAt: sort === 'desc' ? -1 : 1,
      });
    res.json(getHttpResponseContent({ data: posts }));
  },
  // 新增貼文
  postOnePost: async (req, res) => {
    try {
      const {
        body: { content, image },
      } = req;
      if (!content)
        throw getErrorMessage({ field: 'content', message: '請填寫貼文內容' });

      if (image && !image.startsWith('https'))
        throw getErrorMessage({ field: 'image', message: '貼文圖片網址錯誤' });
      // 先寫固定的使用者編號
      const userId = '626fa289b74a64eeba707e84';
      const post = await Post.create({ content, image, user: userId });
      res.json(getHttpResponseContent({ data: post }));
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json(getHttpResponseContent({ success: false, data: error }));
    }
  },
};

module.exports = post;
