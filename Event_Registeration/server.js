const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const app = express();
const port = process.env.PORT || 4110;

connectDB();
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
app.use(helmet());

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/', userRoutes);

// Error handling middleware - MUST be last
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});