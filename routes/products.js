// req.query 練習：https://hackmd.io/@TFOivyvXT-qpG6SieUTfgw/SkvQr78Hc
const express = require('express');
const router = express.Router();

// 'http://localhost:3000/products?category=music&page=1' // 在 POSTMAN 發出 GET 請求
router.get('/', (req, res) => {
  // 取出參數
  const { category, page } = req.query;
  /* 請在此填寫答案*/
  res.status(200).json({
    status: 'success',
    data: {
      /* 請在此填寫答案*/
      category,
      page,
    },
  });
});

module.exports = router;
