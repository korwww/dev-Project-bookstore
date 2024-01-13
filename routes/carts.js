const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const { body, param, validationResult } = require('express-validator');
const {addItemsToCart, getCartItems, removeCartItems} = require('../controller/CartController');

const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());

const validate = (req, res, next) => {
    const err = validationResult(req);
    if (err.isEmpty()) {
        return next();
    } else {
        return res.status(400).json(err.array());
    }
}

router
    .route('/')
    .get(getCartItems)
    .post(addItemsToCart)
    .get("주문 예상 상품 목록 조회");

router.delete('/:id', removeCartItems);

module.exports = router;
