const db = require('../models');

const Coin = db.coin;
const Payment = db.payment;

const getData = async (req, res) => {
  try {
    const response = await Payment.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

const createData = async (req, res) => {
  try {
    await Payment.create({
      bank_name: req.body.bank_name,
      picture: req.file.path,
    });
    res.status(201).json({ message: 'Payment berhasil ditambahkan' });
  } catch (error) {
    console.log(error);
  }
};

const updateData = async (req, res) => {
  try {
    await Payment.update(req.body),
      {
        where: {
          id: req.params.id,
        },
      };
    res.status(201).json({ message: 'Payment Updated' });
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (req, res) => {
  try {
    await Payment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json({ message: 'Payment berhasil dihapus' });
  } catch (error) {
    console.log(error);
  }
};

const getDataById = async (req, res) => {
  try {
    const response = await Payment.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

const getAllData = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Payment.findAll({
      include: [
        {
          model: Coin,
          as: 'coins',
        },
      ],
      where: { id: id },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllData,
  getData,
  getDataById,
  createData,
  updateData,
  deleteData,
};
