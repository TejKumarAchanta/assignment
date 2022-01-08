const express = require('express');
const axios = require('axios');
const router = express.Router();
const redis = require('redis');
const redisClient = redis.createClient(6379, '127.0.0.1');

router.get('/', async (req, res, next) => {
  return res.status(200).json({ message: "Server is up and running." });
});


router.post('/getBalancesBatch', async (req, res) => {

  const { addresses } = req.body;

  if (addresses.length <= 0) return res.status(404).json({ message: 'Incorrect payload....' });

  let finalData = [];

  for (let address of addresses) {

    redisClient.get(address, async (err, data) => {

      if (data) {
        finalData = [...finalData, push(JSON.parse(data))];
        redisClient.setex(address, 100000, JSON.stringify(data));
      } else {
        const url = `https://safe-transaction.gnosis.io/api/v1/safes/${address}/balances/usd/?trusted=false&exclude_spam=false`;

        try {

          const { data } = await axios.get(url);
          redisClient.setex(address, 10000, JSON.stringify(data));
        }
        catch (e) {
          return res.status(500).json({ msg: e.message });
        }

      }
    });

  }
  return res.status(200).json({ finalData });
});

setInterval(() => {
  redisClient.keys('*', async (err, keys) => {
    if (err) process.exit(1);

    for (let addressKey of keys) {
      const url = `https://safe-transaction.gnosis.io/api/v1/safes/${addressKey}/balances/usd/?trusted=false&exclude_spam=false`;

      try {

        const { data } = await axios.get(url);
        redisClient.setex(address, 10000, JSON.stringify(data));
      }
      catch (e) {
        return res.status(500).json({ msg: e.message });
      }
    }
  });
}, 5000)



module.exports = router;
