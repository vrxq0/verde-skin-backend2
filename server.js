const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const orderRoutes = require('./routes/orders');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// الاتصال بقاعدة البيانات
connectDB();

// Middleware
app.use(cors()); // السماح لجميع الأصول (يمكن تخصيصه لاحقًا)
app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Verde Skin API is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});