const config = require('../config/index.js');
// const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

const db = require('../models');
const User = db.user;
// const { jwtKey } = require('../config/index.js');

const isLoginUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

    const data = jwt.verify(token, config.jwtKey);

    const user = await User.findOne({
      where: {
        id: data.user.id,
      },
    });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.log('errornya nih =>>>', error);
    res.status(401).json({
      error: 'Not authorized to access this resource alias ga ada akses bos',
    });
  }
};

module.exports = {
  isLoginUser,
};
