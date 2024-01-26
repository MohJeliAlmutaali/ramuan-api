// app.js

const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const herbalFormulasRoutes = require('./routes/herbalFormulaRoutes');
const ingredientsRoutes = require('./routes/ingredientsRoutes')

// Middleware
app.use(express.json());
// Routes
app.use('/', ingredientsRoutes)
app.use('/', herbalFormulasRoutes);
app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});