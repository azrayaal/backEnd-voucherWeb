const db = require('../models');
const Transactions = db.transactions;

const getData = async (req, res) => {
  try {
    const response = await Transactions.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

const chechkOut = async (req, res) => {
  try {
    const co = await Transactions.create({
      verifyId: req.body.verifyId,
      nameGame: req.body.nameGame,
      payment: req.body.payment,
      jenisCoin: req.body.jenisCoin,
      jumlahCoin: req.body.jumlahCoin,
      hargaCoin: req.body.hargaCoin,
      total: req.body.total,
    });
    res.status(201).json({ co, message: 'Berhasil CO berhasil ditambahkan' });
  } catch (error) {
    console.log(error);
  }
};

const getDataById = async (req, res) => {
  try {
    const response = await Voucher.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getData,
  getDataById,
  chechkOut,
};
