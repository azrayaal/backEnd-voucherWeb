module.exports = (sequelize, DataTypes) => {
  const Coin = sequelize.define(
    'coin',
    {
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
    },
    {
      freezeTableName: true,
      timeStamps: true,
    }
  );

  return Coin;
};
