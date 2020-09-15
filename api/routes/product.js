const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/product')
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)

    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 5
    // },
    fileFilter: fileFilter
});

router.post('/', checkAuth, upload.single('productImage'), productController.product_create);
router.get('/', productController.product_get_all);
router.get('/:productId', productController.product_get_byID);
router.patch('/:productId', checkAuth, productController.product_patch);
router.delete('/:productId', checkAuth, productController.product_delete);

module.exports = router;
