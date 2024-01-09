const express = require('express');
const router = express.Router();
const {addCartsItem, selectCartsItem, removeCartsItem} = require('../controllers/CartsController');

router.use(express.json());

// 장바구니 담기
router.post('/', addCartsItem);

// 장바구니 조회
router.get('/', selectCartsItem);

// 장바구니 도서 삭제
router.delete('/:id', removeCartsItem);

module.exports = router;
