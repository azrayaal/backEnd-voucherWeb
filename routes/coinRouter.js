const coinController = require('../controller/coinController.js');

const express = require('express');
const router = express.Router();

router.get('/', coinController.getData);
router.post('/', coinController.createData);
router.get('/getby/:id', coinController.getDataById);
router.put('/update/:id', coinController.updateData);
router.delete('/delete/:id', coinController.deleteData);

module.exports = router;
