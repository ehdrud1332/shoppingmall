const express = require('express');
const router = express.Router();

const checkAuth = require('../utils/check-auth');

const {
    products_create_product,
    products_get_all,
    products_update_product,
    products_delete_product,
    products_get_product
} = require('../controller/product');





// 전체상품 불러오는 API
router.get('/', products_get_all);

// 상세상품을 불러오는 API
router.get('/:productID', checkAuth, products_get_product);

// 상품 생성하는 API
router.post('/', checkAuth, products_create_product);

// 상품을 수정함
router.patch('/:productID', checkAuth, products_update_product);

// 상품을 삭제함
router.delete('/:productID', checkAuth, products_delete_product);












module.exports = router;

