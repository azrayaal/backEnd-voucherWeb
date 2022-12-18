const userController = require('../controller/userController.js');

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

router.get('/', userController.getAllUser);
router.post('/signin', userController.signin);
router.post('/signup', upload.single('picture'), userController.signup);
router.get('/getby/:id', userController.getUserById);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
