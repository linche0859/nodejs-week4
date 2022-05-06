const Post = require('../models/post');
const {
  getHttpResponseContent,
  getErrorMessage,
} = require('../utils/response');

const post = {
  getPosts: async (req, res) => {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.summary = '取得貼文'
     */
    /**
     * #swagger.parameters['q'] = {
        in: 'query',
        description: '關鍵字',
        type: 'string',
      }
      #swagger.parameters['sort'] = {
        in: 'query',
        description: '排序方式，desc 為新至舊，asc 為舊至新',
        type: 'string',
      }
     */
    const {
      query: { q, sort = 'desc' },
    } = req;
    const filter = q ? { content: new RegExp(q, 'i') } : {};
    const posts = await Post.find(filter)
      .populate({ path: 'user', select: 'name avatar' })
      .sort({
        createdAt: sort === 'desc' ? -1 : 1,
      });
    /**
      #swagger.responses[200] = {
        description: '成功取得貼文',
        schema: { $ref: '#/definitions/Posts' }
      }
     */
    res.status(200).json(getHttpResponseContent({ data: posts }));
  },
  postOnePost: async (req, res) => {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.summary = '新增貼文'
     */
    try {
      /**
        #swagger.parameters['parameter_name'] = {
          in: 'body',
          description: '貼文資料',
          schema: {
            $content: '貼文內容',
            image: '貼文圖片連結'
          }
        }
       */
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
      /**
        #swagger.responses[200] = {
          description: '新增貼文成功',
          schema: { $ref: '#/definitions/Posts' }
        }
     */
      res.status(200).json(getHttpResponseContent({ data: post }));
    } catch (error) {
      /**
        #swagger.responses[400] = {
          description: '新增貼文失敗',
          schema: { $ref: '#/definitions/Error' }
        }
     */
      res
        .status(400)
        .json(getHttpResponseContent({ success: false, data: error }));
    }
  },
};

module.exports = post;
