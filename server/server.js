
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Cross-origin resource sharing
app.use(express.json()); // Body parsing

// Routes
app.use('/api', apiRoutes);

// Placeholder for health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Synchronized', version: '1.0.0-gold' });
});

// Error Handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[FanatiqAI Server] Resonating on port ${PORT}`);
});
