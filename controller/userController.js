const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = db.user;
const config = require('../config/index.js');
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

    await User.findOne({
      where: { email: email },
    }).then((user) => {
      if (user) {
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (checkPassword) {
          const token = jwt.sign(
            {
              user: {
                id: user.id,
                email: user.email,
                name: user.name,
                picture: user.picture,
              },
            },
            config.jwtKey
          );
          return res.status(200).json({
            data: { token },
            user,
          });
        } else {
          res.status(400).send('Password Salah Hayoo tebak lagi');
        }
      } else {
        res.status(400).send('Email tidak terdaftar');
      }
    });
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
