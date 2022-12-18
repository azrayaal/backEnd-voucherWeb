const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = db.user;
require('dotenv').config();

const getAllUser = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

const signup = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
      picture: req.file.path,
    });

    res.status(201).json({ data: user, message: 'User berhasil ditambahkan' });
  } catch (error) {
    console.log(error);
    res.status(400).send('error bos');
  }
};

const signin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = { email: email };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    const getData = await User.findOne({
      where: { email: email },
    });
    if (!getData) res.status(400).send('Email tidak terdaftar');

    const resultLogin = bcrypt.compareSync(password, getData.password);
    if (!resultLogin) res.status(400).send('Password Salah Hayoo tebak lagi');

    return res.send({ accessToken: accessToken, message: 'Berhasil Login' });
  } catch (error) {
    console.log(error);
    res.status(400).send('error bos');
  }
};

const updateUser = async (req, res) => {
  try {
    await User.update(req.body),
      {
        where: {
          id: req.params.id,
        },
      };
    res.status(201).json({ message: 'User Updated' });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json({ message: 'User berhasil dihapus' });
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
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
  getAllUser,
  getUserById,
  signup,
  signin,
  updateUser,
  deleteUser,
};
