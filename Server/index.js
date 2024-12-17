const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
dotenv.config();
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const port = process.env.PORT || 5000;


mongoose.connect(process.env.DB_URL).then(() => {
    console.log('Connected to DB');
}).catch((err) => {
    console.log(err);
});

app.use(cors());

const orderRouter = require('./routes/orderRoute');

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/orders', orderRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});