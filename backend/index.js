// index.js
const express = require('express');
const app = express();
const searchRoutes = require('./routes/search');
require('dotenv').config();

app.use(express.json());

app.use('/api', searchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
