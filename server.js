const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.use('/api/auth',     require('./routes/authRoutes'));
app.use('/api/aircraft', require('./routes/aircraft'));
app.use('/api/lessons',  require('./routes/lessons'));
app.use('/api/progress', require('./routes/progress'));

connectDB().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
  });
});
