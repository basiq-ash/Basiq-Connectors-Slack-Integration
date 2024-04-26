const express = require('express');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorHandler');
const statusRoutes = require('./routes/statusRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Routes
app.use('/api/status', statusRoutes);

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
