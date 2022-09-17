const paymentController = require('../controller/paymentController.js');

const multer = require('multer');
const express = require('express');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './assets/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get('/', paymentController.getData);
router.post('/', upload.single('picture'), paymentController.createData);
router.get('/getby/:id', paymentController.getDataById);
router.get('/getall/:id', paymentController.getAllData);
router.put('/update/:id', paymentController.updateData);
router.delete('/delete/:id', paymentController.deleteData);

module.exports = router;
