const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
// user 1: eduwork-read:12345678 = role 'read'
// user 2: eduwork:12345678 = role 'readWrite'
mongoose.connect('mongodb://eduwork:12345678@localhost:27017/eduwork-native', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'eduwork-native'
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', authMiddleware, productRoutes); 

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
