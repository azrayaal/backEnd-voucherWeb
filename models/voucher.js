module.exports = (sequelize, DataTypes) => {
  const Voucher = sequelize.define(
    'voucher',
    {
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nameGame: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timeStamps: true,
    }
  );

  return Voucher;
};
