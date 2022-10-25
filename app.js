const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
// buat dev
// const PORT = process.env.PORT || 4000;
// buat deploy
const PORT = process.env.PORT || 4020;
const URL = `/api/v1`;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/assets', express.static('assets'));

const voucherRouter = require('./routes/voucherRouter.js');
const coinRouter = require('./routes/coinRouter.js');
const paymentRouter = require('./routes/paymentRouter.js');
app.use('/voucher', voucherRouter);
app.use('/coin', coinRouter);
app.use('/payment', paymentRouter);

// api
app.use(`${URL}/voucher`, voucherRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at: http://localhost:${PORT}`);
  });
});
