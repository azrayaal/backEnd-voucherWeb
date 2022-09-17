const db = require('../models');

const Voucher = db.voucher;
const Coin = db.coin;
const Payment = db.payment;

const getData = async (req, res) => {
  try {
    const response = await Voucher.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

const createData = async (req, res) => {
  try {
    await Voucher.create({
      picture: req.file.path,
      nameGame: req.body.nameGame,
      desc: req.body.desc,
    });
    res.status(201).json({ message: 'Voucher berhasil ditambahkan' });
  } catch (error) {
    console.log(error);
  }
};

const updateData = async (req, res) => {
  try {
    await Voucher.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json({ message: 'Voucher Updated' });
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (req, res) => {
  try {
    await Voucher.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json({ message: 'Voucher berhasil dihapus' });
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

const getAllDatabyid = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Voucher.findOne({
      include: [
        {
          model: Coin,
          as: 'coins',
        },
        {
          model: Payment,
          as: 'payment',
        },
      ],
      where: { id: id },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

const getAllData = async (req, res) => {
  // const id = req.params.id;
  try {
    const response = await Voucher.findAll({
      include: [
        {
          model: Coin,
          as: 'coins',
        },
      ],
      // where: { id: id },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllData,
  getAllDatabyid,
  getData,
  getDataById,
  createData,
  updateData,
  deleteData,
};
