const Order = require('../models/Order');

// إنشاء طلب جديد
const createOrder = async (req, res) => {
  try {
    const { firstName, lastName, address, wilaya, phone, paymentMethod, items, subtotal, shippingCost, total } = req.body;

    if (!firstName || !lastName || !address || !wilaya || !phone || !paymentMethod || !items || items.length === 0) {
      return res.status(400).json({ message: 'جميع الحقول مطلوبة' });
    }

    const order = new Order({
      firstName,
      lastName,
      address,
      wilaya,
      phone,
      paymentMethod,
      items,
      subtotal,
      shippingCost,
      total,
    });

    const createdOrder = await order.save();
    res.status(201).json({
      success: true,
      order: createdOrder,
      message: 'تم حفظ طلبك بنجاح'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'حدث خطأ في الخادم' });
  }
};

// جلب جميع الطلبات (للمسؤول)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'حدث خطأ في الخادم' });
  }
};

// تحديث حالة الطلب
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'الطلب غير موجود' });
    order.status = status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'حدث خطأ في الخادم' });
  }
};

module.exports = { createOrder, getOrders, updateOrderStatus };