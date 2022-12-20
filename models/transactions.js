module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define(
    'transactions',
    {
      verifyId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nameGame: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jenisCoin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jumlahCoin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hargaCoin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timeStamps: true,
    }
  );

  return Transactions;
};
