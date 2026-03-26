// server.js (Backend) – كامل مع CORS محسّن
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

// إعدادات CORS – يمكن تخصيص origin لرابط الواجهة الأمامية
// للتطوير المحلي: استخدم app.use(cors())
// للإنتاج: حدد الرابط الفعلي للواجهة الأمامية
const corsOptions = {
  origin: ['https://vrxq0.github.io', 'http://localhost:5500', 'http://127.0.0.1:5500'], // أضف روابط الواجهة الأمامية
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions)); // أو استخدم app.use(cors()) إذا أردت السماح للجميع

app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Verde Skin API is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
