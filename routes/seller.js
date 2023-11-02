const express = require('express')
const router = express.Router()
const multer = require('multer')
const { storage } = require('../controller/roles/seller.controller')
const upload = multer({ storage })
const controller = require('../controller/index')
const middleware = require('../middleware/index')
const validations = require('../utils/index')


router.post('/products/add', middleware.userTokenVerification, middleware.checkIfTokenIsBlaclisted, middleware.sellerAuth, upload.array('images', 3) , controller.sellerRoleController.Seller.addProduct)

router.get('/products-list',middleware.userTokenVerification, middleware.checkIfTokenIsBlaclisted, middleware.sellerAuth, controller.sellerRoleController.Seller.listProducts)

router.patch('/products/update/:productId',middleware.userTokenVerification, middleware.checkIfTokenIsBlaclisted, middleware.sellerAuth, controller.sellerRoleController.Seller.updateProduct)

router.delete('/products/delete/:productId',middleware.userTokenVerification,  middleware.checkIfTokenIsBlaclisted, middleware.sellerAuth, controller.sellerRoleController.Seller.deleteProduct)

module.exports = router