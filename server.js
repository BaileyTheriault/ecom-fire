const express = require('express');
const cors = require('cors');
const bp = require('body-parser');
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV === 'product') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd',
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    }

    res.send({ success: stripeRes });
  });
});

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});
