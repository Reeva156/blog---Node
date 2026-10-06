require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const postRoutes = require('./routes/postRoutes');

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

app.use('/api/posts', postRoutes);

app.use((req, res) => {
  return res.status(404).json({
    message: `Not Found - ${req.originalUrl}`,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
