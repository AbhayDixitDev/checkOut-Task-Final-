const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv');
dotenv.config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const orderModel = require('../models/orderModel');

router.post('/', async (req, res) => {
  const { cart, amount, name, email } = req.body;

  const items = cart.map(item => ({
    id: item.id,
    name: item.name,
    image: item.image,
    type: item.type,
    category: item.category,
    publish_year: item.publish_year,
    model_number: item.model_number,
    technology: item.technology,
    version: item.version,
    price: item.price,
    quantity: item.quantity,
  }));

  const totalAmount = amount * 100;
  if (!Number.isInteger(totalAmount) || totalAmount < 50) {
    return res.status(400).json({ success: false, message: 'Amount must be an integer greater than or equal to 0.50 USD.' });
  }

  try {
    const order = new orderModel({
      items,
      userEmail: email,
      userName: name,
      numberOfItems: cart.length,
      totalPrice: amount,
      paymentType: 'Online Using Stripe',
      paymentStatus: 'Pending', // Set initial status to Pending
    });

    await order.save();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount, // Amount in cents
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        order_id: order._id.toString(), // Store the order ID for reference
      },
    });

    order.paymentStatus = 'Pending';
    await order.save();

    res.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Error processing payment:', err);
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;