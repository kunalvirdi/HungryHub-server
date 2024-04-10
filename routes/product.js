const router = require("express").Router()
const {upload}=require('../utils')
const {findAll,findByID,postProduct}=require('../controllers/productController')
const {verifyToken, verifyTokenAdmin} = require('../middlewares/verifyToken')

// get all
router.get('/', verifyToken, findAll)

// get one
router.get('/find/:id', verifyToken, findByID)

// create product
router.post('/',verifyTokenAdmin,upload.single('image'),postProduct)

module.exports = router