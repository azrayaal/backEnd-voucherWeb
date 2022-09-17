module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    'payment',
    {
      bank_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timeStamps: true,
    }
  );

  return Payment;
};
