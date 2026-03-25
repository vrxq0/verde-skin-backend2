const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  wilaya: { type: String, required: true },
  phone: { type: String, required: true },
  paymentMethod: { type: String, required: true, enum: ['cod', 'card'] },
  items: [{
    productId: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 }
  }],
  subtotal: { type: Number, required: true },
  shippingCost: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);