const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post');

// 取得貼文
router.get('/', PostController.getPosts);
// 新增貼文
router.post('/', PostController.postOnePost);

module.exports = router;
