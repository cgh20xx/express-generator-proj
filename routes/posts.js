var express = require('express');
var router = express.Router();
const PostModule = require('../models/PostModel');

// 查詢所有資料
router.get('/', async (req, res, next) => {
  const allPost = await PostModule.find();
  res.status(200).json({
    status: 'success',
    data: allPost,
  });
});

// 新增單筆資料
router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    let { name, tags, type, image, content } = data;
    if (!content) {
      // 回傳失敗
      res.status(400).json({
        status: 'false',
        message: '[新增失敗] content 未填寫',
      });
      res.end();
    } else {
      // 新增至 PostModule model
      const newPost = await PostModule.create({
        name,
        tags,
        type,
        image,
        content,
      });
      // 回傳成功
      res.status(200).json({
        status: 'success',
        data: newPost,
      });
      res.end();
    }
  } catch (error) {
    // 回傳失敗
    res.status(400).json({
      status: 'false',
      message: error.message,
    });
  }
});

// 刪除所有資料
router.delete('/', async (req, res, next) => {
  await PostModule.deleteMany({});
  res.status(200).json({
    status: 'success',
    data: [],
  });
});

// 刪除單筆資料
router.delete('/:id', async (req, res, next) => {
  // 取得 id
  // const id = req.params.id;
  // const deletePostById = await PostModule.findByIdAndDelete(id);
  // if (deleteUserById) {
  //   res.status(200).json({
  //     status: 'success',
  //     data: deletePostById,
  //   });
  // } else {
  //   // 回傳失敗 "id 不存在"
  //   res.status(400).json({
  //     status: 'false',
  //     message: 'id 不存在',
  //   });
  // }
});

// 修改單筆資料
router.patch('/:id', async (req, res, next) => {});

module.exports = router;
