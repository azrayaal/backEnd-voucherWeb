const db = require('../models');

const Coin = db.coin;

const getData = async (req, res) => {
  try {
    const response = await Coin.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

const createData = async (req, res) => {
  try {
    await Coin.create({
      jenisCoin: req.body.jenisCoin,
      jumlahCoin: req.body.jumlahCoin,
      hargaCoin: req.body.hargaCoin,
    });
    res.status(201).json({ message: 'Coin berhasil ditambahkan' });
  } catch (error) {
    console.log(error);
  }
};

const updateData = async (req, res) => {
  try {
    await Coin.update(req.body),
      {
        where: {
          id: req.params.id,
        },
      };
    res.status(201).json({ message: 'Coin Updated' });
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (req, res) => {
  try {
    await Coin.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json({ message: 'Coin berhasil dihapus' });
  } catch (error) {
    console.log(error);
  }
};

const getDataById = async (req, res) => {
  try {
    const response = await Coin.findOne({
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
  createData,
  updateData,
  deleteData,
};
