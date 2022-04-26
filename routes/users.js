var express = require('express');
var router = express.Router();
const User = require('../models/users');

// 查詢所有資料
router.get('/', async (req, res, next) => {
  const allUser = await User.find();
  res.status(200).json({
    status: 'success',
    data: allUser,
  });
});

// 新增單筆資料
router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    let { nickName, gender, avatar } = data;
    if (!nickName || !gender) {
      // 回傳失敗
      res.status(400).json({
        status: 'false',
        message: '使用者資料未填寫完整',
      });
    } else {
      // 新增至 User model
      const newUser = await User.create({
        nickName,
        gender,
        avatar,
      });
      // 回傳成功
      res.status(200).json({
        status: 'success',
        data: newUser,
      });
    }
  } catch (error) {
    console.log(3);
    // 回傳失敗
    res.status(400).json({
      status: 'false',
      message: error.message,
    });
  }
});

// 刪除所有資料
router.delete('/', async (req, res, next) => {
  await User.deleteMany({});
  res.status(200).json({
    status: 'success',
    data: [],
  });
});

// 刪除單筆資料
router.delete('/:id', async (req, res, next) => {
  // 取得 id
  const id = req.params.id;
  const deleteUserById = await User.findByIdAndDelete(id);
  if (deleteUserById) {
    res.status(200).json({
      status: 'success',
      data: deleteUserById,
    });
  } else {
    // 回傳失敗 "id 不存在"
    res.status(400).json({
      status: 'false',
      message: 'id 不存在',
    });
  }
});

// 修改單筆資料
router.patch('/:id', async (req, res, next) => {
  try {
    // 取得 id
    const id = req.params.id;
    const data = req.body;
    let { nickName, gender, avatar } = data;
    if (!nickName || !gender) {
      // 回傳失敗 "使用者資料未填寫完整"
      res.status(400).json({
        status: 'false',
        message: '使用者資料未填寫完整',
      });
    } else {
      const editContent = {
        nickName,
        gender,
      };
      // 找出此筆 id 並編輯資料
      const editUser = await User.findByIdAndUpdate(id, editContent, {
        // 加這行才會返回更新後的資料，否則為更新前的資料。
        returnDocument: 'after',
        // update 相關語法預設 runValidators: false，需手動設寪 true。Doc:https://mongoosejs.com/docs/validation.html#update-validators
        runValidators: true,
      });
      if (editUser) {
        // 回傳成功
        res.status(200).json({
          status: 'success',
          data: editUser,
        });
      } else {
        // 回傳失敗 "id 不存在"
        res.status(400).json({
          status: 'false',
          message: 'id 不存在',
        });
      }
    }
  } catch (error) {
    // 回傳失敗
    res.status(400).json({
      status: 'false',
      message: error.message,
    });
  }
});

module.exports = router;
