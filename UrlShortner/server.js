require('dotenv').config();
const connectDB = require('./config/db');
const URLRoutes = require('./routes/URLRoutes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const app = express();
const port = process.env.PORT || 5077;

connectDB();
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
app.use(helmet());

app.use('/api/', URLRoutes);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});