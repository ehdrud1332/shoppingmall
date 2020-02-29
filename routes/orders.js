const express = require('express');
const router = express.Router();
const checkAuth = require("../utils/check-auth");

const {
    orders_get_all,
    orders_create_order,
    orders_get_order,
    orders_update_order,
    orders_delete_all,
    orders_delete_order
} = require('../controller/order');



// 장바구니를 생성하는 API
router.post('/', checkAuth, orders_create_order);

// 전체 장바구니를 불러오는 API
router.get('/', checkAuth, orders_get_all);

// detail order API
router.get('/:orderID', checkAuth, orders_get_order);


// 장바구니를 수정하는 API
router.patch('/:orderID', checkAuth, orders_update_order);        


// 장바구니를 삭제 API
router.delete('/', checkAuth, orders_delete_all);


//특정 장바구니를 삭제하는 API
router.delete('/:orderID', checkAuth, orders_delete_order);


module.exports = router;