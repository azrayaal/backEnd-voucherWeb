const voucherController = require('../controller/voucherController.js');

const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './assets/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// const { isLoginUser } = require('../controller/auth.js');

router.get('/', voucherController.getData);
router.post('/', upload.single('picture'), voucherController.createData);
router.get('/getby/:id', voucherController.getDataById);
router.get('/getall', voucherController.getAllData);
router.get('/getall/:id', voucherController.getAllDatabyid);
router.put('/update/:id', upload.single('picture'), voucherController.updateData);
router.delete('/delete/:id', voucherController.deleteData);

module.exports = router;
