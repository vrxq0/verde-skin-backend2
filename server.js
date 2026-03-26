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

// ✅ إعدادات CORS – السماح بطلبات من GitHub Pages
const allowedOrigins = [
  'https://vrxq0.github.io',           // رابط موقعك على GitHub Pages
  'http://localhost:5500',              // للتطوير المحلي
  'http://127.0.0.1:5500',             // للتطوير المحلي
];

const corsOptions = {
  origin: function (origin, callback) {
    // السماح بالطلبات التي لا تحتوي على origin (مثل Postman) أو التي في القائمة
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Verde Skin API is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
